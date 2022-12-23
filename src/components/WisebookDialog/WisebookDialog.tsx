import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import {
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction,
    DialogButtonsDiv,
    WisebookDialogModal
} from './styles';

import { MouseEventHandler } from 'react';

type WisebookDialogBaseProps = {
    trigger: React.ReactNode,
    title: string | React.ReactNode,
    description?: string | React.ReactNode,
    onCancelClick?: MouseEventHandler<HTMLButtonElement>,
    cancel: string | React.ReactNode,
    onActionClick?: MouseEventHandler<HTMLButtonElement>
    action: string | React.ReactNode,
    className?: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void
};

export function WisebookDialog({ 
    trigger, title, description, cancel, action,
    onActionClick, onCancelClick,
    className, open, onOpenChange
 }: WisebookDialogBaseProps){
    return (
        <WisebookDialogModal
            trigger={trigger}
            className={className}
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogTitle
                asChild={typeof title !== 'string'}
            >
                {title}
            </AlertDialogTitle>
            {description && (
                <AlertDialogComponent.Description
                    asChild={typeof description !== 'string'}
                >
                    {description}
                </AlertDialogComponent.Description>
            )}
            <DialogButtonsDiv>
                <AlertDialogCancel
                    asChild={typeof cancel !== 'string'}
                    onClick={onCancelClick}
                >
                    {cancel}
                </AlertDialogCancel>
                <AlertDialogAction
                    asChild={typeof action !== 'string'}
                    onClick={onActionClick}
                >
                    {action}
                </AlertDialogAction>
            </DialogButtonsDiv>
        </WisebookDialogModal>
    );
}

export * from './styles';