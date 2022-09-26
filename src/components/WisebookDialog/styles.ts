import styled, { css } from 'styled-components';
import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import { colors } from '@styles/base/colors';
import { boxShadow } from '@styles/base/mixin';

type AlertDialogButtonProps = {
    color: string,
    backgroundColor: string 
};

export const AlertDialogButton = ({
    backgroundColor,
    color
}: AlertDialogButtonProps) => css`
    --background-color: ${backgroundColor};
    --border-color: ${backgroundColor};
    --color: ${color};

    --transition: 0.1s ease-in;

    background-color: var(--background-color);
    color: var(--color);
    border: 2px solid var(--border-color);
    border-radius: 3px;

    padding: 0.2rem 0.5rem;

    transition: background-color var(--transition), 
        color var(--transition);

    &:hover {
        --background-color: ${color};
        --color: ${backgroundColor};
    }

    ${boxShadow().onActive}
`; 

export const AlertDialogCancel = styled(AlertDialogComponent.Cancel)`
    ${AlertDialogButton({
        color: colors.white,
        backgroundColor: colors.red
    })}
`;

export const AlertDialogAction = styled(AlertDialogComponent.Action)`
    ${AlertDialogButton({
        color: colors.white,
        backgroundColor: colors.purple_500
    })}
`;

export const AlertDialogTitle = styled(AlertDialogComponent.Title)`
    color: ${colors.purple_800};
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
`;

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

    width: 250px;
    max-width: 100%;
    min-height: 100px;
    max-height: 85vh;

    padding: 1rem;

    .buttons-div {
        display: flex;
        justify-content: center;
        gap: 1rem;

        margin-top: auto;
    }
`;