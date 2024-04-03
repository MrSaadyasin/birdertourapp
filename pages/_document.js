import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K8EE7MCLK7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-K8EE7MCLK7');
              `,
          }}
        />
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-V2BEH2C8G9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V2BEH2C8G9');
          `,
          }}
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />

      </body>
    </Html>
  )
}
