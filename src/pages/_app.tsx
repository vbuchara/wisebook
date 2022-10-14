import 'react-toastify/dist/ReactToastify.min.css';

import { Header } from 'components/Header';
import { WisebookToast } from 'components/WisebookToast';

import { TokenRefreshIntervalContextProvider } from 'src/contexts/TokenRefreshIntervalContext';

import { GlobalStyles } from '@styles/global';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
	return (
		<TokenRefreshIntervalContextProvider>
			<WisebookToast />
			<GlobalStyles />
			<Header />
			<Component {...pageProps} />
		</TokenRefreshIntervalContextProvider>
	);
}

export default App;
