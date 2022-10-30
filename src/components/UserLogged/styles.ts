import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import * as AvatarComponent from '@radix-ui/react-avatar';
import * as DropdownComponent from '@radix-ui/react-dropdown-menu';

import { 
    WisebookDialog,
    AlertDialogContent
} from 'components/WisebookDialog';

import { colors } from '@styles/base/colors';
import { boxShadow } from '@styles/base/mixin';
import { fontSizes } from '@styles/base/fonts';

export const UserLoggedContainer = styled.div`
    padding: 0 1rem;  
`;

export const LogoutDialog = styled(WisebookDialog)`
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
    --font-svg-size: ${fontSizes.clampBase('0.95rem', undefined, '2.5rem')};

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
            --background-color: ${colors.purple_500};
            --color: ${colors.white};
            --font-svg-size: clamp(1rem,1.2vw,2.8rem);

            --transition: 0.1s ease-in;

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.2rem;

            background-color: var(--background-color);
            color: var(--color);
            padding: 0.25rem;
            font-size: var(--font-svg-size);

            border-radius: 3px;
            border: 2px solid ${colors.purple_500};

            transition: background-color var(--transition), 
                color var(--transition);

            svg {
                width: var(--font-svg-size);
                height: var(--font-svg-size);

                fill: var(--color);

                transition: fill var(--transition);
            }

            &:hover{
                --background-color: ${
                    lighten(0.5, colors.purple_500)
                };
                --color: ${colors.purple_500};
            }

            ${boxShadow().onActive}
        `}
    }
`;

export const DropdownContent = styled(DropdownComponent.Content)`
    display: flex;
    flex-direction: column;

    background-color: ${colors.purple_200};

    border-radius: 5px;
    padding: 0.5rem 0;

    ${boxShadow({ 
        color: colors.white,
        transparentizeValue: 0,
        length: '0px 0px 5px 1px',
        inset: false
     }).normal};
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
    position: relative;
`;

export const AvatarFallback = styled(AvatarComponent.Fallback)`
    width: 100%;
    height: 100%;

    & > div {
        position: relative;
        
        img{
            border-radius: 100%;
        }
    }
`;