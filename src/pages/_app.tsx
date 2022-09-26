import 'react-toastify/dist/ReactToastify.min.css';

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { parseCookies } from 'nookies';

import { Header } from 'components/Header';
import { WisebookToast } from 'components/WisebookToast';

import { firebaseApp } from 'src/config/FirebaseConfig';

import { TokenRefreshIntervalContextProvider } from 'src/contexts/TokenRefreshIntervalContext';

import { GlobalStyles } from '@styles/global';

import type { AppProps } from 'next/app';
import type { CookiesType } from '@auth-types';

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
