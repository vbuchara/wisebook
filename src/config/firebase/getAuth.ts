import { getAuth, connectAuthEmulator } from '@firebase/auth';

import { firebaseApp } from '../FirebaseConfig';

const auth = getAuth(firebaseApp);

if(JSON.parse(process.env.NEXT_PUBLIC_USE_EMULATOR) && typeof global.isAuthEmulatorConnected === "undefined"){
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
        disableWarnings: true
    });
    global.isAuthEmulatorConnected = true;
}

export { auth };

