import { useState } from 'react';
import * as TooltipComponent from '@radix-ui/react-tooltip';

import { TooltipArrow, TooltipContent } from './styles';

type WisebookTooltipProps = {
    children: React.ReactNode;
    tooltipText: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void,
    delay?: number,
    tooltipTextColor?: string,
    tooltipBackgroundColor?: string,
}

export function WisebookTooltip({
    children,
    tooltipText,
    delay,
    tooltipTextColor,
    tooltipBackgroundColor,
    ...props
}: WisebookTooltipProps){
    const [open, setOpen] = useState(false);

    const rootOpen = typeof props.open === "boolean" 
        ? props.open 
        : open;
    const rootOnOpenChange = typeof props.onOpenChange === "function"
        ? props.onOpenChange
        : setOpen;
    const rootDelay = typeof delay === "number"
        ? delay
        : 100;

    return (
        <TooltipComponent.Provider>
            <TooltipComponent.Root
                open={rootOpen}
                onOpenChange={rootOnOpenChange}
                delayDuration={rootDelay}
            >
                <TooltipComponent.Trigger
                    asChild
                >
                    {children}
                </TooltipComponent.Trigger>
                <TooltipComponent.Portal>
                    <TooltipContent
                        color={tooltipTextColor}
                        backgroundColor={tooltipBackgroundColor}
                    >
                        <h1>{tooltipText}</h1>
                        <TooltipArrow/>
                    </TooltipContent>
                </TooltipComponent.Portal>
            </TooltipComponent.Root>
        </TooltipComponent.Provider>
    );
}