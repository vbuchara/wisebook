import Router, { BaseRouter } from 'next/dist/shared/lib/router/router';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

declare module "next/router" {
    export function useRouter<
        QueryParams extends ParsedUrlQuery = ParsedUrlQuery
    >(): WisebookNextRouter<QueryParams>;
    
    export type WisebookNextRouter<
        WisebookQueryParams extends ParsedUrlQuery
    > = WisebookBaseRouter<WisebookQueryParams> & Pick<Router, RouterPickProps>;

    export type WisebookBaseRouter<
        WisebookQueryParams extends ParsedUrlQuery
    > = Omit<BaseRouter, 'query'> & {
        query: WisebookQueryParams
    };

    type RouterPickProps = 'push' | 'replace' | 'reload' | 'back' | 'prefetch' | 'beforePopState' | 'events' | 'isFallback' | 'isReady' | 'isPreview';

    export namespace RouteQueryParams {
        interface Cadernos extends ParsedUrlQuery {
            id: string
        }
    }
}