import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { FontAweIcon } from './styles';

import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

type LoadingSpinnerProps = {
    animating?: boolean, 
} & Omit<FontAwesomeIconProps, 'icon' | 'spin'>;

export function LoadingSpinner({ animating, ...props }: LoadingSpinnerProps) {
    return (
        <FontAweIcon
            icon={solid('circle-notch')}
            spin={animating}
            {...props}
        />
    )
}
