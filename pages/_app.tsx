import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Script strategy="lazyOnload" async src="https://www.googletagmanager.com/gtag/js?id=G-LENGWGK7EP"></Script>
      <Script strategy="lazyOnload" id="google-ad">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-LENGWGK7EP',{
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </Fragment>
  )
}

export default MyApp
