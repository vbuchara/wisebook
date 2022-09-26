import styled, { css } from 'styled-components';
import * as ScrollAreaComponent from '@radix-ui/react-scroll-area';
import { darken } from 'polished';

import { headerHeight } from 'components/Header/styles';

import { colors } from '../base/colors';

const SCROLLBAR_WIDTH = '0.75rem' as const;
const SCROLLBAR_PADDING = '3px' as const;
const SCROLLBAR_PADDING_INLINE = `calc(2 * ${SCROLLBAR_PADDING})` as const;

export const CadernosPage = styled.main`
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    height: calc(100vh - ${headerHeight});

    color: ${colors.purple_800};

    * {
        font-size: clamp(1rem,1.2vw,2.8rem);
    }
`;

export const ScrollArea = styled(ScrollAreaComponent.Root)`
    height: 100%;
    overflow-y: hidden;

    background-color: ${colors.purple_400};
`;

type ScrollViewportProps = {
    isScrollVisible?: boolean
}

export const ScrollViewport = styled(ScrollAreaComponent.Viewport).withConfig({
    shouldForwardProp: (prop) => !['isScrollVisible'].includes(prop)
})<ScrollViewportProps>`
    width: 100%;
    height: 100%;

    .add-button {
        box-sizing: border-box;
        padding: 0.25rem 0.5rem;
        margin-top: 0.25rem;
    }

    ${({ isScrollVisible }) => {
        return !isScrollVisible 
            ? "" 
            : css`

                & > div > * {
                    --scrollbar-width: ${SCROLLBAR_WIDTH};
                    --scrollbar-padding-inline: ${SCROLLBAR_PADDING_INLINE};
    
                    margin-inline-end: calc(var(--scrollbar-width) + var(--scrollbar-padding-inline));
                }
            `;
    }}

    ul {
        display: flex;
        flex-direction: column;
        gap: clamp(1.25rem, 1vw + 0.5rem, 3rem);

        padding-block: 1rem;

        & > li {
            padding-inline: 2rem;
        } 
    }
`;

export const ScrollScrollbar = styled(ScrollAreaComponent.Scrollbar)`
    --padding: ${SCROLLBAR_PADDING};
    --padding-block: calc(2 * var(--padding));

    display: flex;
    user-select: none;
    touch-action: none;

    height: calc(100% - var(--padding-block));
    width: ${SCROLLBAR_WIDTH};
    padding: var(--padding);
    background-color: ${darken(0.05)(colors.purple_400)};
`;

export const ScrollThumb = styled(ScrollAreaComponent.Thumb)`
    flex: 1;
    background-color: ${darken(0.1)(colors.white)};
    border-radius: 0.5rem;

    position: relative;

    &::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
    }
`;

export const NotebooksListContainer = styled.ul`
    height: 100%;
    overflow-y: auto;

    background-color: ${colors.purple_400};
    border-right: 3px solid ${darken(0.05)(colors.purple_400)}; 
`;