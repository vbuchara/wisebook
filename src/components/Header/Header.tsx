import type { CookieSerializeOptions } from "next/dist/server/web/types";

import React, { useEffect } from "react";
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getAuth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { firebaseApp } from 'config/FirebaseConfig';

import { LoginButton } from "components/LoginButton";

import { 
    HeaderStyle,  
} from "./styles";

export function Header(){
    const router = useRouter();

    const auth = getAuth(firebaseApp);
    const [signInWithGoogle, authRes, loading, errorRes] = useSignInWithGoogle(auth);

    useEffect(() => {
        if(errorRes){
            if(errorRes.code === 'auth/popup-closed-by-user'){
                toast("Login não concluído", {
                    autoClose: 4 * 1000
                });
            }
        }
    }, [errorRes]);

    useEffect(() => {
        if(authRes){
            toast("Usuário Logado! Redirecionando...", {
                autoClose: false,
            });

            setTimeout(async() => {
                const tokenId = await authRes.user.getIdToken();

                setCookie(null, 'userToken', tokenId, {
                    maxAge: 60 * 60 * 1000,
                    path: '/'
                } as CookieSerializeOptions);

                router.push(
                    `/cadernos`, 
                );
            }, 1000);
        }
    }, [authRes]);

    function handleLoginButton() {
        signInWithGoogle();
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