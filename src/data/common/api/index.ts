/* eslint-disable @typescript-eslint/no-explicit-any */
import {RefreshToken} from '@/data/auth/sources/RefreshTokenMutation';
import {store} from '@/view/common/store';
import {onSetCredentials} from '@/view/common/store/slices/auth';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {enqueueSnackbar} from 'notistack';

import {mapToBaseError} from '../mappers/ErrorMapper';

type PendingRequestCallback = (token: string) => void;

let isTokenRefreshing = false;
const pendingRequest: Array<PendingRequestCallback> = [];

function onTokenRefreshed(token: string) {
	pendingRequest.filter(cb => cb(token));
}

function addPendingRequest(callback: PendingRequestCallback) {
	pendingRequest.push(callback);
}

const instance = axios.create({
	timeout: 1800000,
});

type OriginalRequestConfig =
	| (AxiosRequestConfig<Response> & {_retryCount?: number})
	| undefined;

const onRequest = (config: any) => {
	const {token} = store.getState().auth.authData;
	if (token) {
		config.headers = {
			token,
		};
	}
	return config;
};

const onRequestError = (error: AxiosError) => {
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => response;

const onResponseError = async (error: AxiosError) => {
	const {config, response} = error;
	const originalRequest: OriginalRequestConfig = config;
	const status = response?.status;

	const basedError = mapToBaseError(error as any);

	if (status !== 401) {
		enqueueSnackbar(`${basedError.title}: ${basedError.message}`, {
			variant: 'error',
		});
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
			const {refresh_token, token, user_info} = store.getState().auth.authData;

			if (!refresh_token) {
				throw error;
			}

			const {code, data} = await RefreshToken({
				refresh_token,
				token,
				user_uuid: user_info.uuid,
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

			onTokenRefreshed(data.token);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			isTokenRefreshing = false;
		}
	}

	return retryOriginalRequest;
};

instance.interceptors.request.use(onRequest, onRequestError);

instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
