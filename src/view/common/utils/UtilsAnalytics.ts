import ReactGA from 'react-ga4';

type LogEventProps = {
	category: string;
	action: string;
	label?: string;
};

export const initiateGoogleAnalytics = () => {
	if (process.env.NEXT_PUBLIC_GA_ID) {
		ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
	}
};

export const logEvent = ({category, action, label}: LogEventProps) => {
	ReactGA.event({
		category: category,
		action: action,
		label: label,
	});
};
