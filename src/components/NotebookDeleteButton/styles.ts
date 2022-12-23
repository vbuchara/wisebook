import styled from 'styled-components';

import { colors } from '@styles/base/colors';
import { button } from '@styles/base/mixin';

import { 
    WisebookDialog, 
    AlertDialogCancel, 
    AlertDialogAction 
} from '../WisebookDialog';

export const DeleteNotebookDialog = styled(WisebookDialog)`&& {
    width: 400px;

    ${AlertDialogCancel}{
        ${button({
            color: colors.white,
            backgroundColor: colors.purple_500,
        })};
    }

    ${AlertDialogAction}{
        ${button({
            color: colors.white,
            backgroundColor: colors.red,
        })};
    }
}`;