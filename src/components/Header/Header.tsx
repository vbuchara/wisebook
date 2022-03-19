import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { 
    HeaderStyle,  
} from "./styles";
import { LoginButton } from "components/LoginButton";

export function Header(){
    const auth = getAuth();
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