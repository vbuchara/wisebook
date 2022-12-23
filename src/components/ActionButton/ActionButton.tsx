import { forwardRef, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as TooltipComponent from "@radix-ui/react-tooltip";

import { 
    TooltipArrow, 
    TooltipContent,
    RoundedButton
} from "./styles";

import type { MouseEventHandler } from 'react';
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { RoundedButtonProps } from './styles';

type ActionButtonProps = {
    icon: IconProp,
    iconColor?: string,
    backgroundColor?: string,
    tooltipText?: string,
    tooltipTextColor?: string,
    onClick?: MouseEventHandler,
    className?: string
} & React.HTMLAttributes<HTMLButtonElement>;

export function ActionButtonComponent({
    icon,
    iconColor,
    backgroundColor,
    tooltipText,
    tooltipTextColor,
    onClick,
    className,
    ...props
}: ActionButtonProps, ref: React.Ref<HTMLButtonElement>){
    const [open, setOpen] = useState(false);

    const TriggerButton = useMemo(() => {
        return forwardRef<
            HTMLButtonElement, 
            React.HTMLAttributes<HTMLButtonElement> & RoundedButtonProps
        >((props, ref) => {
            return (
                <RoundedButton
                    {...props}
                    ref={ref}
                >
                    <FontAwesomeIcon
                        icon={icon}
                    />
                </RoundedButton>
            );
        });
    }, [icon]);

    return (
        <TooltipComponent.Provider>
            <TooltipComponent.Root
                open={(open && !!tooltipText)}
                onOpenChange={setOpen}
                delayDuration={100}
            >
                <TooltipComponent.Trigger
                    asChild
                >
                    <TriggerButton
                        {...props}
                        ref={ref}
                        className={className}
                        iconColor={iconColor}
                        backgroundColor={backgroundColor}
                        onClick={onClick}
                    />
                </TooltipComponent.Trigger>
                <TooltipComponent.Portal>
                    <TooltipContent
                        color={tooltipTextColor}
                    >
                        <h1>{tooltipText}</h1>
                        <TooltipArrow/>
                    </TooltipContent>
                </TooltipComponent.Portal>
            </TooltipComponent.Root>
        </TooltipComponent.Provider>
    );
}

export const ActionButton = 
    forwardRef<HTMLButtonElement, ActionButtonProps>(ActionButtonComponent);