import 'src/config/FirebaseConfig';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { 
	MainPage, 
	Title 
} from '@styles/index';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Wisebook</title>
				<meta name="description" content="A taking note and notebook app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MainPage>
				<Title>Index</Title>
			</MainPage>
		</>
	)
}

export default Home
