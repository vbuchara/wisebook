import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import * as AvatarComponent from '@radix-ui/react-avatar';
import * as DropdownComponent from '@radix-ui/react-dropdown-menu';

import { 
    WisebookDialog
} from 'components/WisebookDialog';

import { colors } from 'src/styles/colors';

export const UserLoggedContainer = styled.div`
    padding: 0 1rem;  
`;

export const LogoutDialog = styled(WisebookDialog)`
    width: 250px;

    .buttons-div {
        justify-content: center;
    }
`;

export const DropdownTrigger = styled(DropdownComponent.Trigger)`
    background-color: transparent;
    cursor: default;

    * {
        pointer-events: none;
    }
`;

export const DropdownArrow = styled(DropdownComponent.Arrow)`
    fill: ${colors.purple_200};
`;

export const DropdownSeparator = styled(DropdownComponent.Separator)`
    height: 1px;
    background-color: ${colors.purple_400};
    margin: 0.4rem 0.3rem;
    flex-grow: 1;

    width: auto;
`;


export const DropdownLabel = styled(DropdownComponent.Label)`
    --font-svg-size: clamp(0.95rem,1vw,2.5rem);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    color: ${colors.purple_800};
    width: 10rem;
    max-width: 12rem;

    text-align: center;

    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;

    font-weight: 600;
    font-size: var(--font-svg-size);

    label {
        max-width: 80%;
    }

    svg {
        width: var(--font-svg-size);
        height: var(--font-svg-size);
        
        fill: ${colors.purple_800};
    }
`;

export const DropdownItem = styled(DropdownComponent.Item)`
    margin: 0.25rem 0.5rem;
    flex-grow: 1;

    &:is(button){
        ${css`
            --text-color: ${colors.white};
            --text-color-hover: ${colors.purple_500};
            --font-svg-size: clamp(1rem,1.2vw,2.8rem);

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.2rem;

            background-color: ${colors.purple_500};
            color: var(--text-color);
            padding: 0.25rem;
            font-size: var(--font-svg-size);

            border-radius: 3px;
            border: 2px solid ${colors.purple_500};

            svg {
                width: var(--font-svg-size);
                height: var(--font-svg-size);

                fill: var(--text-color);
            }

            &:hover{
                background-color: ${
                    lighten(0.5, colors.purple_500)
                };
                color: var(--text-color-hover);

                svg {
                    fill: var(--text-color-hover);
                }
            }
        `}
    }
`;

export const DropdownContent = styled(DropdownComponent.Content)`
    display: flex;
    flex-direction: column;

    box-shadow: 0px 0px 5px 1px ${colors.white};
    background-color: ${colors.purple_200};

    border-radius: 5px;
    padding: 0.5rem 0;
`;

export const TitleHeading = styled.h1`
    color: ${colors.purple_800};
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
`;

export const ActionButton = styled.button<ActionButtonProps>`
    --primary-color: ${props => props.primaryColor};
    --secondary-color: ${props => props.secondaryColor};

    background-color: var(--primary-color);
    color: var(--secondary-color);
    border: 2px solid var(--primary-color);
    border-radius: 3px;

    padding: 0.2rem 0.5rem;

    &:hover {
        background-color: var(--secondary-color);
        color: var(--primary-color);
    }
`;

export const Avatar = styled(AvatarComponent.Root)`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 3.5rem;
    height: 3.5rem;
    background-color: ${colors.purple_400};
    border: 2px solid ${colors.purple_200};
    border-radius: 100%;
`;

export const AvatarImage = styled(AvatarComponent.Image)`
    width: 100%;
    height: 100%;
`;

export const AvatarFallback = styled(AvatarComponent.Fallback)`
    width: 100%;
    height: 100%;

    & > div {
        img{
            border-radius: 100%;
        }
    }
`;

type ActionButtonProps = {
    primaryColor: string,
    secondaryColor: string,
}