import styled from "styled-components";
import { colors } from "./colors";

export const Title = styled.h1`
    color: ${colors.purple_400};
    font-size: 2.5rem;
`;

export const MainPage = styled.main`
    display: flex;
    flex-direction: column;

    section {
        display: flex;
        justify-content: center;
        align-items: center;

        width: auto;
        min-height: 70vh;
    }
`;