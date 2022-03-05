import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { colors } from "../../styles/colors";

export const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    height: 10vh;

    background-color: ${colors.purple_600};

    padding: 0.25rem;
`;

export const LoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    margin-left: auto;
    padding: 0.95rem;

    border-radius: 0.4vw;
    background-color: ${colors.red};
    
    h1 {
        font-size: clamp(1.5rem, 1.8vw, 3vw);
        color: ${colors.white};
    }
`;

export const GoogleIcon = styled(FontAwesomeIcon)`
    height: clamp(1.5rem, 1.8vw, 3vw);

    path {
        fill: ${colors.white};
    }
`;