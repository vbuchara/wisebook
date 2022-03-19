declare module "@fortawesome/fontawesome-svg-core/import.macro" {
    import type { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';

    export function brands(icon: IconName): IconProp;

    export function solid(icon: IconName): IconProp;

    export function regular(icon: IconName): IconProp;
}