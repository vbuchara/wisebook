import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAweIcon, IconWrapper } from './styles';

import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

type LoadingComponentProps = {
    animating?: boolean, 
} & Omit<FontAwesomeIconProps, 'icon' | 'spin'>;

export function LoadingComponent({ animating, className, ...props }: LoadingComponentProps) {
    return (
        <IconWrapper
            className={className}
        >
            <FontAweIcon
                icon={faCircle}                        
                spin={animating}
                {...props}
            />
            <FontAweIcon
                icon={faCircle}                        
                spin={animating}
                {...props}
            />
            <FontAweIcon
                icon={faCircle}                        
                spin={animating}
                {...props}
            />
        </IconWrapper>
    )
}
