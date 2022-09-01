import * as AlertDialogComponent from '@radix-ui/react-alert-dialog';

import {
    AlertDialogContent,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger
} from './styles';

type WisebookDialogBaseProps = {
    trigger: JSX.Element,
    title: string | JSX.Element,
    description?: string | JSX.Element,
    cancel: string | JSX.Element,
    action: string | JSX.Element,
    className?: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void
};

export function WisebookDialog({ 
    trigger, title, description, cancel, action,
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
                    <AlertDialogComponent.Title
                        asChild={typeof title !== 'string'}
                    >
                        {title}
                    </AlertDialogComponent.Title>
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
                        <AlertDialogComponent.Cancel
                            asChild={typeof cancel !== 'string'}
                        >
                            {cancel}
                        </AlertDialogComponent.Cancel>
                        <AlertDialogComponent.Action
                            asChild={typeof action !== 'string'}
                        >
                            {action}
                        </AlertDialogComponent.Action>
                    </div>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialogComponent.Root>
    );
}

export {
    AlertDialogContent,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger
};