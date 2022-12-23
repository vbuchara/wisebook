import { 
    useState 
} from 'react';
import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import {
    ModalContent,
    ModalPortal,
    ModalOverlay,
    ModalTrigger
} from './styles';

import type { ModalContentProps } from './styles';

type WisebookModalBaseProps = {
    trigger: React.ReactNode,
    children: React.ReactNode,
    modalContentStyle?: ModalContentProps,
    className?: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void,
    onEscapeKeyDown?: (event: KeyboardEvent) => void
};

export function WisebookModal({ 
    trigger,
    children,
    className, 
    modalContentStyle,
    ...props
 }: WisebookModalBaseProps){
    const [open, setOpen] = useState(false);

    return (
        <AlertDialogComponent.Root
            open={props.open ? props.open : open}
            onOpenChange={props.onOpenChange ? props.onOpenChange : setOpen}
        >
            <ModalTrigger asChild>
                {trigger}
            </ModalTrigger>
            <ModalPortal>
                <ModalOverlay
                    onClick={() => {
                        (props.onOpenChange 
                            ? props.onOpenChange(false)
                            : setOpen(false)
                        );
                    }}
                />
                <ModalContent
                    className={className}
                    onEscapeKeyDown={props.onEscapeKeyDown}
                    {...modalContentStyle}
                >
                    {children}
                </ModalContent>
            </ModalPortal>
        </AlertDialogComponent.Root>
    );
}

export * from './styles';