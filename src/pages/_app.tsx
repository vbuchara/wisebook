import type { AppProps } from 'next/app';
import { Header } from '@components/Header';

import { GlobalStyles } from '@styles/global';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default App;
