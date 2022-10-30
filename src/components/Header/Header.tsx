import React, { useCallback, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { signOut } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import * as Tooltip from '@radix-ui/react-tooltip';

import { auth } from 'src/config/firebase/getAuth';

import { LoginButton } from "components/LoginButton";
import { Userlogged } from 'components/UserLogged';

import { useTokenRefreshInterval } from "src/hooks/useTokenRefreshInterval";

import { 
    HeaderStyle,  
    LogoImage
} from "./styles";

import type { Id } from 'react-toastify';
import type { CookieSerializeOptions } from "next/dist/server/web/types";
import type { CookiesType } from "@auth-types";

export function Header(){
    const router = useRouter();
    const { tokenRefreshInterval, setTokenRefreshInterval } = useTokenRefreshInterval();

    const [loading, setLoading] = useState(true);

    const [signInWithGoogle, authRes, loginLoading, errorRes] = useSignInWithGoogle(auth);
    const [user, authStateLoading] = useAuthState(auth);

    const setUserTokenId = useCallback(async() => {
        if(!user) return;
        
        const tokenId = await user.getIdToken();

        setCookie({}, 'userToken', tokenId, {
            path: '/'
        } as CookieSerializeOptions);
    }, [user]);

    function showSuccessToast(){
        return new Promise<Id>((resolve) => {
            const toastId = toast.success("Usuário Logado! Redirecionando...", {
                autoClose: false,
                onOpen: () => {
                    resolve(toastId);
                },
            });
        }); 
    }

    useEffect(() => {
        if(authStateLoading) return;
        
        const cookies: CookiesType = parseCookies({});

        if(!cookies.userToken && !user){
            router.push('/');
        }

        if(cookies.userToken && !user){
            destroyCookie({}, "userToken", {
                path: '/'
            });
            router.push('/');
        }
    }, [authStateLoading]);

    /**
     * Refresh the token when component is rendered and 
     * tokenRefreshInterval is not set.
     */
    useEffect(() => {
        if(tokenRefreshInterval || !user) return;

        (async() => {
            await setUserTokenId();

            const interval = window.setInterval(() => {
                setUserTokenId();
            }, 29 * 60 * 1000);
    
            setTokenRefreshInterval(interval);
        })();
    }, []);
    
    useEffect(() => {  
        setLoading(loginLoading || authStateLoading);
    }, [loginLoading, authStateLoading]);

    useEffect(() => {
        const cookies: CookiesType = parseCookies({});

        if(!cookies.userToken && user && !authStateLoading){
			window.clearInterval(tokenRefreshInterval!);
            signOut(auth);
            destroyCookie({}, "userToken", {
                path: '/'
            });
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
        if(!authRes) return;

        (async() => {
            const toastId = await showSuccessToast();

            await setUserTokenId();

            router.push(
                `/cadernos`, 
            );

            toast.dismiss(toastId);

            const interval = window.setInterval(() => {
                setUserTokenId();
            }, 29 * 60 * 1000);

            setTokenRefreshInterval(interval);
        })();
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