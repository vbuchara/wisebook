import React, { useEffect, useState } from "react";
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getAuth } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import * as Tooltip from '@radix-ui/react-tooltip';

import { firebaseApp } from 'config/FirebaseConfig';

import { LoginButton } from "components/LoginButton";
import { Userlogged } from 'components/UserLogged';

import { 
    HeaderStyle,  
    LogoImage
} from "./styles";

import type { CookieSerializeOptions } from "next/dist/server/web/types";

export function Header(){
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const auth = getAuth(firebaseApp);
    const [signInWithGoogle, authRes, loginLoading, errorRes] = useSignInWithGoogle(auth);
    const [user, authStateLoading] = useAuthState(auth);
    
    useEffect(() => {  
        setLoading(loginLoading || authStateLoading);
    }, [loginLoading, authStateLoading]);

    useEffect(() => {
        if(errorRes){
            if(errorRes.code === 'auth/popup-closed-by-user'){
                toast.warning("Login não concluído!", {
                    autoClose: 4 * 1000
                });
            }
        }
    }, [errorRes]);

    useEffect(() => {
        if(authRes){
            const toastId = toast.success("Usuário Logado! Redirecionando...", {
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

                toast.dismiss(toastId);
            }, 1000);
        }
    }, [authRes]);

    function handleLoginButton() {
        signInWithGoogle();
    }
    
    return (
        <Tooltip.Provider>
            <HeaderStyle>
                <LogoImage/>
                {(user && !loading) ? (
                    <Userlogged
                        user={user}
                    />
                ) : (
                    <LoginButton 
                        handleLoginButton={handleLoginButton} 
                        loading={loading}
                    /> 
                )}
            </HeaderStyle>
        </Tooltip.Provider>
    );
}