import { GenreEntity } from './entity/GenreEntity';
import { StoryEntity } from './entity/StoryEntity';
export type * from './GenrenatorTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GenrenatorEntityBase } from './GenrenatorEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GenrenatorSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Genre(entopts?: Record<string, any>): GenreEntity;
    Story(entopts?: Record<string, any>): StoryEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GenrenatorSDK;
    tester(testopts?: any, sdkopts?: any): GenrenatorSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GenrenatorSDK;
export { stdutil, config, BaseFeature, GenrenatorEntityBase, GenrenatorSDK, SDK, };
