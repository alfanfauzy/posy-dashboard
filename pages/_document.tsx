import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en" id="theme">
    <Head>
      <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
