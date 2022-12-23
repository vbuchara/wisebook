import React, { useEffect, useState } from 'react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { FontAweIcon, LoginButtonStyle } from './styles';
import { LoadingComponent } from 'components/LoadingComponent';

type LoginButtonProps = {
    handleLoginButton: () => void,
    loading: boolean
};

export function LoginButton({ handleLoginButton, loading }: LoginButtonProps) {
    return (
        <LoginButtonStyle
            onClick={handleLoginButton}
            isLoading={loading}
        >
            <LoadingComponent 
                animating
                className='loading-spinner'
            />
            <FontAweIcon      
                icon={faGoogle}
                className='google-logo'
            />
            <h1>Login <span>com Google</span></h1>
        </LoginButtonStyle>
    )
}
