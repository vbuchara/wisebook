import { getDatabase, connectDatabaseEmulator } from '@firebase/database';
import { getApp } from 'firebase/app';

import { firebaseApp } from '../FirebaseConfig';

const database = getDatabase(firebaseApp);

if(process.env.NEXT_PUBLIC_USE_EMULATOR && typeof global.isDatabaseEmulatorConnected === "undefined"){
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
    global.isDatabaseEmulatorConnected = true;
}

export { database };