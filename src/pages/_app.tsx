import 'react-toastify/dist/ReactToastify.min.css';

import { Header } from 'components/Header';
import { GlobalStyles, WisebookToastContainer } from '@styles/global';

import WisebookLogo from '@public/wisebook-logo.svg';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<WisebookToastContainer
				icon={<WisebookLogo />}
                position="top-right"
				pauseOnHover={false}
				pauseOnFocusLoss={false}
                closeOnClick
            />
			<GlobalStyles />
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default App;
