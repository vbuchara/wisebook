import styled from 'styled-components';
import * as TooltipComponent from '@radix-ui/react-tooltip';

import { colors } from '@styles/base/colors';
import { fontSizes } from '@styles/base/fonts';
import { boxShadow } from '@styles/base/mixin';

type TooltipContentProps = {
    color?: string
};

export const TooltipContent = styled(TooltipComponent.Content)<TooltipContentProps>`
    --background-color: ${colors.white};
    --color: ${({ color }) => color || colors.purple_800};

    border-radius: 4px;
    padding: 0.5rem;
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

type RoundedButtonProps = {
    iconColor?: string,
    backgroundColor?: string,
};

export const RoundedButton = styled.button.withConfig({
    shouldForwardProp: (prop) => !['iconColor', 'backgroundColor'].includes(prop)
})<RoundedButtonProps>`
    --svg-size: ${fontSizes.clampBase("1rem")};
    --button-diameter: var(--svg-size);

    --primary-color: ${({ backgroundColor }) => backgroundColor || colors.purple_800};
    --secondary-color: ${({ iconColor }) => iconColor || colors.white};

    --background-color: var(--primary-color);
    --color: var(--secondary-color);

    --transition: 0.3s ease-in;
    --parent-transition: background-color var(--transition);

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: content-box;
    border-radius: 50%;
    background-color: var(--background-color);
    
    width: var(--button-diameter);
    height: var(--button-diameter);
    padding: 0.5rem;

    transition: var(--parent-transition);

    svg {
        height: var(--svg-size);

        path {
            transition: fill var(--transition);
            fill: var(--color);
        }
    }

    &:hover{
        --background-color: var(--secondary-color);
        --color: var(--primary-color);

        transition: box-shadow 1s ease-out,
            var(--parent-transition);
    }

    ${boxShadow({ 
        color: colors.white,
        transparentizeValue: 0,
        length: '0px 0px 10px 1px',
        inset: false
     }).onHover};
`;