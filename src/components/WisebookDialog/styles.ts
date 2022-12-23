import styled from 'styled-components';
import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import { WisebookModal } from '../WisebookModal';

import { colors } from '@styles/base/colors';
import { button } from '@styles/base/mixin';

export const AlertDialogCancel = styled(AlertDialogComponent.Cancel)`
    ${button({
        color: colors.white,
        backgroundColor: colors.red
    })}
`;

export const AlertDialogAction = styled(AlertDialogComponent.Action)`
    ${button({
        color: colors.white,
        backgroundColor: colors.purple_500
    })}
`;

export const DialogButtonsDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;

    margin-top: auto;
`;

export const AlertDialogTitle = styled(AlertDialogComponent.Title)`
    color: ${colors.purple_800};
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
`;

export const WisebookDialogModal = styled(WisebookModal)`&&{
    --top: 30%;
};`;