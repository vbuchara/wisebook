import * as admin from 'firebase-admin';

if(admin.apps.length < 1){
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
}

export default admin;