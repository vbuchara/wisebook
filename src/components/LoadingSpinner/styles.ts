import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors } from '@styles/colors';

export const FontAweIcon = styled(FontAwesomeIcon)`
    ${(props) => {
        return props.spin && css`
            animation: spin 2s infinite linear;
        `;
    }};

    path {
        fill: ${colors.white}
    };
`;