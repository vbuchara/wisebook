import styled from 'styled-components';
import * as PopoverComponent from '@radix-ui/react-popover';

import { colors } from '@styles/base/colors';
import { boxShadow } from '@styles/base/mixin';

type TriggerButtonProps = {
    primaryColor?: string,
    secondaryColor?: string,
};

export const ColorPickerPopoverArrow = styled(PopoverComponent.Arrow)`
    fill: ${colors.purple_800};
`;

export const ColorPickerPopoverContent = styled(PopoverComponent.Content)`
    --background-color: transparent;
    --padding: 0;

    border-radius: 4px;
    padding: var(--padding);
    background-color: var(--background-color);
`;

export const TriggerButton = styled.button.withConfig({
    shouldForwardProp: (prop) => !['primaryColor', 'secondaryColor'].includes(prop),
})<TriggerButtonProps>`
    --primary-color: ${
        ({ primaryColor }) => primaryColor 
            ? primaryColor 
            : colors.purple_800
    };
    --secondary-color: ${
        ({ secondaryColor }) => secondaryColor 
            ? secondaryColor 
            : colors.white
    };

    --background-color: var(--primary-color);
    --border-color: var(--background-color);
    --color: var(--secondary-color);
    --border-width: 1px;
    --svg-size: 1rem;
    --padding-block: 0.3rem;
    --padding-inline: 0.4rem;
    --transition: 0.3s ease;

    width: var(--svg-size);
    height: var(--svg-size);

    background-color: var(--background-color);
    border: var(--border-width) solid var(--border-color);
    color: var(--color);

    padding-block: var(--padding-block);
    padding-inline: var(--padding-inline);

    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;

    line-height: 1;

    cursor: pointer;
    box-sizing: content-box;
    transition: 
        background-color var(--transition), 
        color var(--transition)
    ;

    svg {
        path {
            fill: var(--color);
        }
    }

    &:hover, &:active {
        --color: var(--primary-color);
        --background-color: var(--secondary-color);
        --border-color: var(--primary-color);
    }

    ${boxShadow({
        length: "0px 0px 5px 2px"
    }).onActive}
`;