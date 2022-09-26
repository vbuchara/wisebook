import styled from 'styled-components';
import { transparentize } from 'polished';

import { colors } from '@styles/base/colors';
import { boxShadow } from '@styles/base/mixin';
import { fontSizes } from '@styles/base/fonts';

type AddButtonProps = {
    isLoading: boolean
};

export const AddButton = styled.button<AddButtonProps>`
    --background-color: ${colors.purple_600};
    --color: ${colors.white};

    --transition: 0.1s ease-in; 

    background-color: var(--background-color);
    padding: 0.25rem 0;
    width: 100%;
    border-radius: 3px; 

    transition: background-color var(--transition);

    .loading-icon {
        justify-content: center;
        height: clamp(0.6rem, 0.7vw, 1.2rem);
        padding-block: clamp(0.2rem, 0.25vw, 0.8rem);

        svg {
            height: auto;
        }
    }

    & > svg {
        height: ${fontSizes.clampBase('1rem')};

        path{
            transition: fill var(--transition);
            fill: var(--color);
        }
    }

    &:hover {
        --background-color: ${colors.white};
        --color: ${colors.purple_600};
    }

    ${boxShadow().onActive}
`;