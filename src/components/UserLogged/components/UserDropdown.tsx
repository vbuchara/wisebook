import { useMemo, useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import LinesEllipsis from "react-lines-ellipsis";
import nookies from 'nookies';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { firebaseApp } from 'config/FirebaseConfig';

import UserIcon from '@public/person-icon.svg';
import LogoutIcon from '@public/logout-icon.svg';

import { colors } from 'src/styles/colors';

import { 
    ActionButton,
    DropdownArrow,
    DropdownContent, 
    DropdownItem, 
    DropdownLabel, 
    DropdownSeparator,
    LogoutDialog,
    TitleHeading
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

    const [openDialog, setOpenDialog] = useState(false);

    function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        (async() => {
            event.preventDefault();
            setOpenDialog(false);
            setDropdownOpen(false);

            await signOut(auth);
            nookies.destroy(null, "userToken");
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

    const DialogTitle = useMemo(() => {
        return (
            <TitleHeading>
                Tem certeza que deseja sair da conta atual?
            </TitleHeading>
        );
    }, []);

    const DialogCancel = useMemo(() => {
        return (
            <ActionButton
                primaryColor={colors.red}
                secondaryColor={colors.white}
            >
                Não
            </ActionButton>
        );
    }, []);

    const DialogAction = useMemo(() => {
        return (
            <ActionButton
                primaryColor={colors.purple_500}
                secondaryColor={colors.white}
                onClick={handleLogout}
            >
                Sim
            </ActionButton>
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
                    <UserIcon
                        width={undefined}
                        height={undefined}
                        viewBox="0 0 48 48"
                    />
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
                    title={DialogTitle}
                    cancel={DialogCancel}
                    action={DialogAction}
                />
                <DropdownArrow/>
            </DropdownContent>
        </Dropdown.Portal>
    );
}