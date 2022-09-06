import styled from 'styled-components';

import { headerHeight } from 'components/Header/styles';

import { colors } from '../colors';

export const CadernosPage = styled.main`
    display: flex;
    gap: 1rem;

    height: calc(100vh - ${headerHeight});
`;

export const NotebooksListContainer = styled.ul`
    min-height: 100%;
    overflow-y: hidden;
    background-color: ${colors.purple_400};
`;