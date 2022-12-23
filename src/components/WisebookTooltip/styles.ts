import styled from 'styled-components';
import * as TooltipComponent from '@radix-ui/react-tooltip';

import { colors } from '@styles/base/colors';
import { fontSizes } from '@styles/base/fonts';
import { boxShadow } from '@styles/base/mixin';

type TooltipContentProps = {
    color?: string,
    backgroundColor?: string,
};

export const TooltipContent = styled(TooltipComponent.Content).withConfig({
    shouldForwardProp: (prop) => !['color', 'backgroundColor'].includes(prop), 
})<TooltipContentProps>`
    --background-color: ${({ backgroundColor }) => backgroundColor || colors.white};
    --color: ${({ color }) => color || colors.purple_800};
    --padding: 0.5rem;

    border-radius: 4px;
    padding: var(--padding);
    line-height: 1;
    background-color: var(--background-color);
    color: var(--color);
    font-size: ${fontSizes.clampBase('1rem')};
    
    ${boxShadow({ 
        color: colors.white,
        transparentizeValue: 0,
        length: '0px 0px 5px 1px',
        inset: false
     }).normal};
`;

export const TooltipArrow = styled(TooltipComponent.Arrow)`
    fill: ${colors.white};
`;