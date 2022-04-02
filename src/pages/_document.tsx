import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                enhanceApp: (App) => (props) =>
                    sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link
                      href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&display=swap"
                      rel="stylesheet"
                    />
                    <link rel="icon" type="image/png" href="/favicon16x16.png" sizes="16x16" />
                    <link rel="icon" type="image/png" href="/favicon32x32.png" sizes="32x32" />
                    <link rel="icon" type="image/png" href="/favicon96x96.png" sizes="96x96" />

                    <link rel="apple-touch-icon" sizes="72x72" href="/favicon72x72.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/favicon114x114.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/favicon152x152.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}