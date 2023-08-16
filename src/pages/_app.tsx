import React from "react";
import "../../global.css";
import { SSRProvider as AriaProvider } from "@react-aria/ssr";
import Head from "next/head";
import theme from "@app/utils/nextui";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Script from "next/script";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { Analytics } from '@vercel/analytics/react';

const siteDesc =
  "Indexing the knowledge of podcasts & videos with AI. Search, read, or watch! Search captions & find exact moments.";

function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AriaProvider>
        <Head>
          <meta name="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="theme-color" content="#3a2323" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <title>WhisperCast</title>
          <meta name="description" content={siteDesc} />
          <meta property="og:description" content={siteDesc} />
          <meta name="twitter:description" content={siteDesc} />
          <meta property="og:image" content="/images/og-image-8.png" />
          <meta name="twitter:image" content="https://whispercast.io/images/og-image-8.png" />
          <meta property="og:image:width" content="620" />
          <meta property="og:image:height" content="335" />
          <meta property="og:site_name" content="WhisperCast" />
          <meta property="og:title" content="WhisperCast" />
          <meta name="twitter:title" content="WhisperCast" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://whispercast.io${router.pathname}`} />
          <meta property="twitter:url" content={`https://whispercast.io${router.pathname}`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="whispercast.io" />

          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            dark: theme.className,
          }}
        >
          <NextUIProvider theme={theme}>
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>

        <Analytics />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NS7T1N8R25"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NS7T1N8R25');
          `}
        </Script>
      </AriaProvider>
    </SWRConfig>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your utils to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
