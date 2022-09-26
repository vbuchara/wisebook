import styled from 'styled-components';

import { colors } from '@styles/base/colors';

import { 
    WisebookDialog, 
    AlertDialogCancel, 
    AlertDialogButton, 
    AlertDialogAction 
} from '../WisebookDialog';

export const DeleteNotebookDialog = styled(WisebookDialog)`
    && {
        width: 400px;

        ${AlertDialogCancel}{
            ${AlertDialogButton({
                color: colors.white,
                backgroundColor: colors.purple_500,
            })};
        }

        ${AlertDialogAction}{
            ${AlertDialogButton({
                color: colors.white,
                backgroundColor: colors.red,
            })};
        }
    }
`;