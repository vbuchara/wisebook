import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

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
                icon={solid('circle')}                        
                spin={animating}
                {...props}
            />
            <FontAweIcon
                icon={solid('circle')}                        
                spin={animating}
                {...props}
            />
            <FontAweIcon
                icon={solid('circle')}                        
                spin={animating}
                {...props}
            />
        </IconWrapper>
    )
}
