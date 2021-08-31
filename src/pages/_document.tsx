import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script
                        data-domain="music-player-orpin.vercel.app"
                        src="https://plausible.io/js/plausible.js"
                    ></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
