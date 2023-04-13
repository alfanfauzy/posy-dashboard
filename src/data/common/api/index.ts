import {RefreshToken} from '@/data/auth/sources/RefreshTokenMutation';
import {store} from '@/view/common/store';
import {onSetCredentials} from '@/view/common/store/slices/auth';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

type PendingRequestCallback = (token: string) => void;

let isTokenRefreshing = false;
const pendingRequest: Array<PendingRequestCallback> = [];

function onTokenRefreshed(token: string) {
	pendingRequest.filter(cb => cb(token));
}

function addPendingRequest(callback: PendingRequestCallback) {
	pendingRequest.push(callback);
}

const instance = axios.create();

type OriginalRequestConfig =
	| (AxiosRequestConfig<Response> & {_retryCount?: number})
	| undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance.interceptors.request.use((config: any) => {
	const {token} = store.getState().auth.authData;

	if (token) {
		config.headers = {
			token,
		};
	}

	return config;
});

instance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const {config, response} = error;
		const originalRequest: OriginalRequestConfig = config;
		const status = response?.status;

		if (status !== 401) {
			return Promise.reject(error);
		}

		if (!originalRequest) {
			return Promise.reject(error);
		}

		originalRequest._retryCount = originalRequest?._retryCount || 0;
		if (originalRequest._retryCount >= 3) {
			return Promise.reject(error);
		}

		originalRequest._retryCount += 1;

		const retryOriginalRequest = new Promise(resolve => {
			addPendingRequest(async (token: string) => {
				if (originalRequest) {
					originalRequest.headers = {
						...originalRequest?.headers,
						token,
					};

					resolve(instance(originalRequest));
				}
			});
		});

		if (!isTokenRefreshing) {
			try {
				isTokenRefreshing = true;

				const {refresh_token, token, user_info} =
					store.getState().auth.authData;

				if (!refresh_token) {
					throw error;
				}

				const {code, data} = await RefreshToken({
					refresh_token,
					token,
					user_uuid: user_info.user_uuid,
				});

				if (code === 401 || !data) {
					throw error;
				}

				store.dispatch(
					onSetCredentials({
						token: data.token,
						refresh_token: data.refresh_token,
						expired_at: data.expired_at.seconds,
						uuid: data.uuid,
					}),
				);

				/**
				 * TODO:
				 * - Get and set access permission, then retry pending request
				 */
				onTokenRefreshed(data.token);
			} catch (err) {
				// AuthDataSource.deleteAuthCredential();
				return Promise.reject(err);
			} finally {
				isTokenRefreshing = false;
			}
		}

		return retryOriginalRequest;
	},
);

export default instance;
