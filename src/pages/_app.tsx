import "../scss/App.scss";
import Link from "next/link";

const App = ({ Component, pageProps }) => {
    return (
        <>
            <header>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/testing">
                    <a>Test</a>
                </Link>
            </header>
            <Component {...pageProps} />
        </>
    );
};

export default App;
