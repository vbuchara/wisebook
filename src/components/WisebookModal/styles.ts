import styled, { css } from 'styled-components';
import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import { colors } from '@styles/base/colors';

export const ModalTrigger = styled(AlertDialogComponent.Trigger)`

`;

export const ModalOverlay = styled(AlertDialogComponent.Overlay)`
    background-color: ${colors.black};
    opacity: 0.4;
    position: fixed;
    inset: 0;
    z-index: 10;
`;

export const ModalPortal = styled(AlertDialogComponent.Portal)`

`;

export type ModalContentProps = {
    minWidth?: string | number,
    width?: string | number,
    maxWidth?: string | number,
    minHeight?: string | number
    height?: string | number,
    maxHeight?: string | number,
}

export const ModalContent = styled(AlertDialogComponent.Content)<ModalContentProps>`
    --background-color: ${colors.white};
    --color: inherit;
    --padding: 1rem;
    --top: 50%;
    --left: 50%;
    --z-index: 11;

    background-color: var(--background-color);
    color: var(--color);
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    position: fixed;
    top: var(--top);
    left: var(--left);
    translate: -50% -50%;
    z-index: var(--z-index);

    ${({ 
        minHeight,
        height, 
        maxHeight, 
        minWidth,
        width, 
        maxWidth 
    }) => css`
        min-width: ${minWidth ? minWidth : "100px"};
        width: ${width ? width : "250px"};
        max-width: ${maxWidth ? maxWidth : "100%"};
        min-height: ${minHeight ? minHeight : "100px"};
        ${height ? "height: ${85vh};" : ""};
        max-height: ${maxHeight ? maxHeight : "85vh"};
    `}

    padding: var(--padding);
`;