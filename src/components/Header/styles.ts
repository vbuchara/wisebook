import styled from "styled-components";

import LogoSvg from '@public/logo.svg';

import { colors } from "@styles/colors";

export const LogoImage = styled(LogoSvg)`
    @media screen and (max-width: 400px){
        [data-role="text"] {
            display: none;
            visibility: hidden;
            pointer-events: none;
        }
    }
`;

export const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: ${colors.purple_500};

    height: 4rem;
    padding: 0.3rem;
    padding-left: 3vw;
    padding-right: 4vw;

    & > h1 {
        font-size: clamp(1rem, 1.5vw, 2.8rem);
        color: ${colors.purple_800};
    }
`;