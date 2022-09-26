import styled from "styled-components";

import LogoSvg from '@public/logo.svg';

import { colors } from "@styles/base/colors";

export const headerHeight = "4rem";

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

    height: ${headerHeight};
    padding: 0.5rem;
    padding-left: 3vw;
    padding-right: 4vw;
    box-sizing: border-box;

    & > h1 {
        font-size: clamp(1rem, 1.5vw, 2.8rem);
        color: ${colors.purple_800};
    }
`;