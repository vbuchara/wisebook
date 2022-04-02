import styled from "styled-components";

import { colors } from "@styles/colors";

export const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: ${colors.purple_500};

    padding: 0.5rem;
    padding-right: 5%;

    & > h1 {
        font-size: clamp(0.8rem, 1.5vw, 2.8rem);
        color: ${colors.purple_800};
    }
`;