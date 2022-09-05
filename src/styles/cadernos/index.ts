import styled from 'styled-components';

import { colors } from '../colors';

export const CadernosPage = styled.main`
    display: flex;
    gap: 1rem;
`;

export const NotebooksListContainer = styled.div`
    min-height: 100%;
    overflow-y: scroll;
    background-color: ${colors.purple_400};
`;