import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, runTransaction } from 'firebase/database';
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { firebaseApp } from 'config/FirebaseConfig';

import { LoginButton } from "components/LoginButton";

import { 
    HeaderStyle,  
} from "./styles";

export function Header(){
    const auth = getAuth(firebaseApp);
    const [signInWithGoogle, authResponse, loading, errorResponse] = useSignInWithGoogle(auth);

    async function handleLoginButton() {
        await signInWithGoogle();
    }

    if(authResponse || errorResponse) {

    }

    return (
        <HeaderStyle>
            <h1>
                Logo
            </h1>
            <LoginButton 
                handleLoginButton={handleLoginButton} 
                loading={loading}
            /> 
        </HeaderStyle>
    );
}