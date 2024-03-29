declare module "@fortawesome/fontawesome-svg-core/import.macro" {
    import type { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';

    export function brands(icon: IconName): IconProp;

    export function solid(icon: IconName): IconProp;

    export function regular(icon: IconName): IconProp;
}

declare module "react-imask/extended" {
    export type InputMaskRef<Opts extends IMask.AnyMaskedOptions = IMask.AnyMaskedOptions> = {
        maskRef: IMask.InputMask<Opts>;
    };
}

declare module "@radix-ui"{
    export type PointerDownOutsideEvent = CustomEvent<{
        originalEvent: PointerEvent;
    }>;
    export type FocusOutsideEvent = CustomEvent<{
        originalEvent: FocusEvent;
    }>;
}


declare type HandleOnKeyPressCallbacksType<T extends Element> = Map<
    KeyboardEventKey, 
    (event: React.KeyboardEvent<T>| KeyboardEvent) => void
>;