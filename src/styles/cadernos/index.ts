import styled from 'styled-components';
import { darken } from 'polished';

import { headerHeight } from 'components/Header/styles';

import { colors } from '../colors';

export const CadernosPage = styled.main`
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    height: calc(100vh - ${headerHeight});

    * {
        font-size: clamp(1rem,1.2vw,2.8rem);
    }
`;

export const NotebooksListContainer = styled.ul`
    min-height: 100%;
    overflow-y: hidden;

    background-color: ${colors.purple_400};
    border-right: 3px solid ${darken(0.05)(colors.purple_400)}; 
`;