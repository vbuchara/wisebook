import 'react-toastify/dist/ReactToastify.min.css';

import { Header } from 'components/Header';
import { WisebookToast } from 'components/WisebookToast';

import { GlobalStyles } from '@styles/global';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<WisebookToast />
			<GlobalStyles />
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default App;
