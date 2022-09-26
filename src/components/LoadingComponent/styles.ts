import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors } from '@styles/base/colors'

export const IconWrapper = styled.div`
    display: flex;
    gap: clamp(0.4rem, 0.5vw, 0.9rem);
`;

export const FontAweIcon = styled(FontAwesomeIcon)`
    ${(props) => {
        return props.spin && css`

        &:nth-child(1){
            animation: fade 0.7s infinite alternate-reverse;
            animation-delay: 0.15s;
        }

        &:nth-child(2){
            animation: fade 0.7s infinite alternate-reverse;
            animation-delay: 0.3s;
        }

        &:nth-child(3){
            animation: fade 0.7s infinite alternate-reverse;
            animation-delay: 0.45s;
        }
        `;
    }};

    path {
        fill: ${colors.white}
    };
`;