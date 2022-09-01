import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as DropdownComponent from '@radix-ui/react-dropdown-menu';

import { UserAvatar } from './components/UserAvatar';
import { UserDropdown } from './components/UserDropdown';

import {
    UserLoggedContainer,
    DropdownTrigger,
} from './styles';

import type { User } from 'firebase/auth';

type UserLoggedProps = {
    user: User
};

export function Userlogged({ user }: UserLoggedProps) {
    const timeoutRef = useRef<number>();

    const [isOpen, setIsOpen] = useState(false);
    const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
    const [allowClose, setAllowClose] = useState(true);

    function handleDropdownTriggerOnMouseEnter(event: React.MouseEvent<Element, MouseEvent>){
        setIsOpen(true);
        setIsHoveringTooltip(true);
    }

    function handleDropdownTriggerOnMouseLeave(event: React.MouseEvent<Element, MouseEvent>){
        setIsHoveringTooltip(false);
    }

    function handleDropdownContentOnMouseEnter(event: React.MouseEvent<Element, MouseEvent>){
        setIsHoveringTooltip(true);
    }

    function handleDropdownContentOnMouseLeave(event: React.MouseEvent<Element, MouseEvent>){
        setIsHoveringTooltip(false);
    }

    function cancelClose(){
        clearTimeout(timeoutRef.current);
        setAllowClose(false);
        setIsOpen(true);
    } 

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        
        timeoutRef.current = window.setTimeout(() => {
            if(isHoveringTooltip || !allowClose) return;
            setIsOpen(false);
        }, 400);

        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [isHoveringTooltip, allowClose]);
    
    return (
        <UserLoggedContainer>
            <DropdownComponent.Root
                open={isOpen}
                onOpenChange={(open) => {
                    if(allowClose) setIsOpen(open);
                }}
                modal={false}
            >
                <DropdownTrigger
                    onMouseEnter={handleDropdownTriggerOnMouseEnter}
                    onMouseLeave={handleDropdownTriggerOnMouseLeave}
                >
                    <UserAvatar 
                        user={user}
                    />
                </DropdownTrigger>
                <UserDropdown
                    user={user}
                    contentOnMouseEnter={handleDropdownContentOnMouseEnter}
                    contentOnMouseLeave={handleDropdownContentOnMouseLeave}
                    allowDropdownClose={() => { setAllowClose(true); }}
                    cancelDropdownClose={cancelClose}
                    setDropdownOpen={setIsOpen}
                />
            </DropdownComponent.Root>
        </UserLoggedContainer>
    )
}
