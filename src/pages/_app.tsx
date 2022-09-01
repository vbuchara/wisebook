import 'react-toastify/dist/ReactToastify.min.css';

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { parseCookies } from 'nookies';

import { Header } from 'components/Header';
import { WisebookToast } from 'components/WisebookToast';

import { GlobalStyles } from '@styles/global';

import { firebaseApp } from 'src/config/FirebaseConfig';

import type { AppProps } from 'next/app';
import type { CookiesType } from '@auth-types';

function App({ Component, pageProps }: AppProps) {
	const auth = getAuth(firebaseApp);
	const [user, authStateLoading] = useAuthState(auth);

	useEffect(() => {
        const cookies: CookiesType = parseCookies(null);

        if(!cookies.userToken && user && !authStateLoading){
            signOut(auth);
        }
    }, [authStateLoading]);

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
