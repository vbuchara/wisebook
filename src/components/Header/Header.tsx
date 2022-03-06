import React, { useEffect } from "react";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getAuth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { 
    HeaderStyle, 
    LoginButton,
    GoogleIcon 
} from "./styles";

import { firebaseApp } from "config/FirebaseConfig";

export function Header(){
    const auth = getAuth(firebaseApp);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    async function handleLoginButton() {
        await signInWithGoogle();
    }

    if(user || error && !loading) {
        console.log(user ? user : error);
    }

    return (
        <HeaderStyle>
            <LoginButton
                onClick={handleLoginButton}
            >
                <GoogleIcon      
                    icon={brands('google')}
                />
                <h1>Login com Google</h1>
            </LoginButton>
        </HeaderStyle>
    );
}