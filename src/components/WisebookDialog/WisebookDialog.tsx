import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import {
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogCancel,
    AlertDialogAction
} from './styles';

import type { MouseEventHandler } from 'react';

type WisebookDialogBaseProps = {
    trigger: JSX.Element,
    title: string | JSX.Element,
    description?: string | JSX.Element,
    onCancelClick?: MouseEventHandler<HTMLButtonElement>,
    cancel: string | JSX.Element,
    onActionClick?: MouseEventHandler<HTMLButtonElement>
    action: string | JSX.Element,
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
        <AlertDialogComponent.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogPortal>
                <AlertDialogOverlay
                    onClick={() => {
                        (onOpenChange && onOpenChange(false));
                    }}
                />
                <AlertDialogContent
                    className={className}
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
                    <div
                        className="buttons-div"
                    >
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
                    </div>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialogComponent.Root>
    );
}

export * from './styles';