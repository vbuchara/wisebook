import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { colors } from "@styles/colors";

const vars = {
    loginButton: colors.red,
    loginText: colors.white,
} as const;

export const HeaderStyle = styled.header`
    display: flex;
    align-items: center;

    background-color: ${colors.purple_600};

    padding: 0.5rem;
    padding-right: 5%;

    h1 {
        color: ${colors.purple_800};
    }
`;

export const LoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    margin-left: auto;
    padding: clamp(0.6rem, 1vh, 2.6rem) clamp(1rem, 1vw, 3rem);

    border-radius: 0.4vw;
    background-color: ${vars.loginButton};
    
    h1 {
        font-size: clamp(1rem, 1.8vw, 3rem);
        color: ${vars.loginText};
    }
`;

export const FontAweIcon = styled(FontAwesomeIcon)`
    height: clamp(1rem, 1.8vw, 3rem);

    path {
        fill: ${vars.loginText};
    }
`;