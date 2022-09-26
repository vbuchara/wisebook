import { useMemo, useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";
import nookies from 'nookies';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { firebaseApp } from 'config/FirebaseConfig';

import { useTokenRefreshIntervalContext } from "src/hooks/useTokenRefreshIntervalContext";

import LogoutIcon from '@public/logout-icon.svg';

import { 
    DropdownArrow,
    DropdownContent, 
    DropdownItem, 
    DropdownLabel, 
    DropdownSeparator,
    LogoutDialog
} from "../styles";

import type { User } from 'firebase/auth';

type UserDropdownProps = {
    contentOnMouseEnter: (event: React.MouseEvent<Element, MouseEvent>) => void,
    contentOnMouseLeave: (event: React.MouseEvent<Element, MouseEvent>) => void,
    user: User,

    allowDropdownClose: () => void,
    cancelDropdownClose: () => void,
    setDropdownOpen: (open: boolean) => void
};

export function UserDropdown({
    contentOnMouseEnter,
    contentOnMouseLeave,
    user,
    allowDropdownClose,
    cancelDropdownClose,
    setDropdownOpen
}: UserDropdownProps){
    const auth = getAuth(firebaseApp);
    const router = useRouter();
    const [tokenRefreshInterval] = useTokenRefreshIntervalContext();

    const [openDialog, setOpenDialog] = useState(false);

    function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        (async() => {
            event.preventDefault();
            setOpenDialog(false);
            setDropdownOpen(false);

            await signOut(auth);
            nookies.destroy(null, "userToken");
            window.clearInterval(tokenRefreshInterval!);
            router.push("/");
        })();
    }

    const LogoutButton = useMemo(() => {
        return (
            <DropdownItem
                as="button"
                onClick={() => {
                    (cancelDropdownClose && cancelDropdownClose());
                }}
            >
                <LogoutIcon
                    width={undefined}
                    height={undefined}
                    viewBox="0 0 48 48"
                />
                Logout
            </DropdownItem>
        );
    }, []);

    useEffect(() => {
        (openDialog) ? cancelDropdownClose() : allowDropdownClose();
    }, [openDialog]);

    return (
        <Dropdown.Portal>
            <DropdownContent
                avoidCollisions={false}
                onMouseEnter={contentOnMouseEnter}
                onMouseLeave={contentOnMouseLeave}
            >
                <DropdownLabel>
                    <LinesEllipsis
                        text={user.displayName || undefined}
                        maxLine={3}
                        ellipsis="..."
                        component='label'
                        trimRight
                    />
                </DropdownLabel>
                <DropdownSeparator/>
                <LogoutDialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    trigger={LogoutButton}
                    title="Tem certeza que deseja sair da conta atual?"
                    cancel="Não"
                    action="Sim"
                    onActionClick={handleLogout}
                />
                <DropdownArrow/>
            </DropdownContent>
        </Dropdown.Portal>
    );
}