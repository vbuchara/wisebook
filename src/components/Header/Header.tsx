import React, { useEffect } from "react";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getAuth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { 
    HeaderStyle, 
    LoginButton,
    FontAweIcon 
} from "./styles";

export function Header(){
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    async function handleLoginButton() {
        await signInWithGoogle();
    }

    if(user || error) {
        console.log(user ? user : error);
    }

    return (
        <HeaderStyle>
            <h1>
                Logo
            </h1>
            <LoginButton
                onClick={handleLoginButton}
            >
                <FontAweIcon      
                    icon={brands('google')}
                />
                <h1>Login com Google</h1>
            </LoginButton>
        </HeaderStyle>
    );
}