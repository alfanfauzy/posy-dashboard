/* eslint-disable @next/next/inline-script-id */
import {Head, Html, Main, NextScript} from 'next/document';
import Script from 'next/script';

const Document = () => (
	<Html lang="en" id="theme">
		<Head>
			<link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
		</Head>
		<body>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}}`}
			/>
			<Script strategy="lazyOnload">
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    });
                `}
			</Script>
			<Main />
			<div id="modal-root" />
			<NextScript />
		</body>
	</Html>
);

export default Document;
