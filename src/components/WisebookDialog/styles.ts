import styled from 'styled-components';
import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import { colors } from 'src/styles/colors';

export const AlertDialogTrigger = styled(AlertDialogComponent.Trigger)`

`;

export const AlertDialogOverlay = styled(AlertDialogComponent.Overlay)`
    background-color: ${colors.black};
    opacity: 0.4;
    position: fixed;
    inset: 0;
`;

export const AlertDialogPortal = styled(AlertDialogComponent.Portal)`

`;

export const AlertDialogContent = styled(AlertDialogComponent.Content)`
    background-color: ${colors.white};
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    position: fixed;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);

    width: 500px;
    max-width: 100%;
    min-height: 100px;
    max-height: 85vh;

    padding: 1rem;

    .buttons-div {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;

        margin-top: auto;
    }
`;