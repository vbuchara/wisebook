import React, { useCallback, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getAuth, signOut } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import * as Tooltip from '@radix-ui/react-tooltip';

import { firebaseApp } from 'config/FirebaseConfig';

import { LoginButton } from "components/LoginButton";
import { Userlogged } from 'components/UserLogged';

import { useTokenRefreshIntervalContext } from "src/hooks/useTokenRefreshIntervalContext";

import { 
    HeaderStyle,  
    LogoImage
} from "./styles";

import type { CookieSerializeOptions } from "next/dist/server/web/types";
import type { CookiesType } from "@auth-types";

export function Header(){
    const router = useRouter();
    const [tokenRefreshInterval, setTokenRefreshInterval] = useTokenRefreshIntervalContext();

    const [loading, setLoading] = useState(true);

    const auth = getAuth(firebaseApp);
    const [signInWithGoogle, authRes, loginLoading, errorRes] = useSignInWithGoogle(auth);
    const [user, authStateLoading] = useAuthState(auth);

    const setUserTokenId = useCallback(async() => {
        if(!user) return;

        const tokenId = await user.getIdToken();

        setCookie(null, 'userToken', tokenId, {
            path: '/'
        } as CookieSerializeOptions);
    }, [user]);

    /**
     * Refresh the token when component is rendered and 
     * tokenRefreshInterval is not set.
     */
    useEffect(() => {
        if(tokenRefreshInterval) return;

        (async() => {
            await setUserTokenId();

            const interval = window.setInterval(() => {
                setUserTokenId();
            }, 59 * 60 * 1000);
    
            setTokenRefreshInterval(interval);
        })();
    }, []);
    
    useEffect(() => {  
        setLoading(loginLoading || authStateLoading);
    }, [loginLoading, authStateLoading]);

    useEffect(() => {
        const cookies: CookiesType = parseCookies(null);

        if(!cookies.userToken && user && !authStateLoading){
			window.clearInterval(tokenRefreshInterval!);
            signOut(auth);
        }
    }, [authStateLoading]);

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

            (async() => {
                await setUserTokenId();

                router.push(
                    `/cadernos`, 
                );

                toast.dismiss(toastId);

                const interval = window.setInterval(() => {
                    setUserTokenId();
                }, 59 * 60 * 1000);

                setTokenRefreshInterval(interval);
            })();
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