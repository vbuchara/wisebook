import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as TooltipComponent from "@radix-ui/react-tooltip";

import { 
    TooltipArrow, 
    TooltipContent,
    RoundedButton
} from "./styles";

import type { MouseEventHandler } from 'react';
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type ActionButtonProps = {
    icon: IconProp,
    iconColor?: string,
    backgroundColor?: string,
    tooltipText?: string,
    tooltipTextColor?: string,
    onClick?: MouseEventHandler,
    className?: string
};

export function ActionButton({
    icon,
    iconColor,
    backgroundColor,
    tooltipText,
    tooltipTextColor,
    onClick,
    className
}: ActionButtonProps){
    const roundedButtonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

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
                    <RoundedButton
                        ref={roundedButtonRef}
                        className={className}
                        iconColor={iconColor}
                        backgroundColor={backgroundColor}
                        onClick={onClick}
                    >
                        <FontAwesomeIcon
                            icon={icon}
                        />
                    </RoundedButton>
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