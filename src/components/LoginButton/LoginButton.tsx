import React, { useEffect, useState } from 'react';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import { FontAweIcon, LoginButtonStyle } from './styles';
import { LoadingSpinner } from 'components/LoadingSpinner';

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
            <LoadingSpinner 
                animating
                className='loading-spinner'
            />
            <FontAweIcon      
                icon={brands('google')}
                className='google-logo'
            />
            <h1>Login com Google</h1>
        </LoginButtonStyle>
    )
}
