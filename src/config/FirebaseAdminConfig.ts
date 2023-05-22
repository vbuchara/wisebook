import * as admin from 'firebase-admin';

if(admin.apps.length < 1){
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
}

export default admin;