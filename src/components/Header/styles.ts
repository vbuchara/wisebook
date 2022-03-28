import styled from "styled-components";

import { colors } from "@styles/colors";

export const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: ${colors.purple_600};

    padding: 0.5rem;
    padding-right: 5%;

    & > h1 {
        color: ${colors.purple_800};
    }
`;