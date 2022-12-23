import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import * as PopoverComponent from '@radix-ui/react-popover';
import { HexColorPicker } from 'react-colorful';
import { atom, useAtom } from 'jotai';
import debounce from 'lodash/debounce';

import { 
    ColorPickerPopoverArrow,
    ColorPickerPopoverContent,
    TriggerButton 
} from "./styles";

import type {
    FocusOutsideEvent, PointerDownOutsideEvent
} from '@radix-ui';
import type { HTMLAttributes } from 'react';

type ColorPickerProps = {
    triggerPrimaryColor?: string,
    triggerSecondaryColor?: string,
    color: string,
    setColor: (color: string) => void,
} & React.HTMLAttributes<HTMLButtonElement>;

export function ColorPicker({
    triggerPrimaryColor,
    triggerSecondaryColor,
    color,
    setColor,
    ...props
}: ColorPickerProps){
    const popoverTriggerRef = useRef<HTMLButtonElement | null>(null);

    const [open, setOpen] = useState(false);

    const colorPickedAtom = useMemo(() => {
        return atom(color);
    }, [color, setColor]);
    const [colorPicked, setColorPicked] = useAtom(colorPickedAtom);

    const PopoverTrigger = useMemo(() => {
        return forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>((props, ref) => {
            return (
                <TriggerButton
                    {...props}  
                    ref={ref}
                    primaryColor={triggerPrimaryColor}
                    secondaryColor={triggerSecondaryColor}
                    {...props}
                >
                    <FontAwesomeIcon
                        icon={faPalette}
                    />
                </TriggerButton>
            );
        });
    }, [triggerPrimaryColor, triggerSecondaryColor]);

    const debouncedSetColor = useCallback(debounce(
        setColor,
        200,
        {
            leading: false,
            trailing: true
        }
    ),[color, setColor]);

    function onOpenChange(currentOpen: boolean){
        setOpen(currentOpen);

        if(!currentOpen) debouncedSetColor.cancel();
    }

    function onInteractOutside(event: PointerDownOutsideEvent | FocusOutsideEvent){
        if(!popoverTriggerRef.current) return;
        const buttonElement = event.composedPath()
            .find((target) => target instanceof HTMLButtonElement) as HTMLButtonElement | undefined;
        
        if(buttonElement && buttonElement.isEqualNode(popoverTriggerRef.current)){
            event.preventDefault();
        }
    }

    function onEscapeKeyDown(event: KeyboardEvent){
        event.preventDefault();
        setOpen(false);
    }

    return (
        <PopoverComponent.Root
            open={open}
            onOpenChange={onOpenChange}
            modal={true}
        >
            <PopoverComponent.Trigger
                asChild
            >
                <PopoverTrigger
                    ref={popoverTriggerRef}
                    {...props}
                />
            </PopoverComponent.Trigger>
            <PopoverComponent.Portal>
                <ColorPickerPopoverContent
                    style={{
                        zIndex: 1000
                    }}
                    onInteractOutside={onInteractOutside}
                    onEscapeKeyDown={onEscapeKeyDown}
                >
                    <HexColorPicker
                        color={colorPicked}
                        onChange={(newColor) => {
                            setColorPicked(newColor);
                            debouncedSetColor(newColor);
                        }}
                    />
                    <ColorPickerPopoverArrow/>
                </ColorPickerPopoverContent>
            </PopoverComponent.Portal>
        </PopoverComponent.Root>
    );
}