import { EstimateEntity } from './entity/EstimateEntity';
import { JobEntity } from './entity/JobEntity';
import { PlatformEntity } from './entity/PlatformEntity';
import { UploadEntity } from './entity/UploadEntity';
export type * from './VidsmallerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { VidsmallerEntityBase } from './VidsmallerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class VidsmallerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Estimate(entopts?: Record<string, any>): EstimateEntity;
    Job(entopts?: Record<string, any>): JobEntity;
    Platform(entopts?: Record<string, any>): PlatformEntity;
    Upload(entopts?: Record<string, any>): UploadEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): VidsmallerSDK;
    tester(testopts?: any, sdkopts?: any): VidsmallerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof VidsmallerSDK;
export { stdutil, config, BaseFeature, VidsmallerEntityBase, VidsmallerSDK, SDK, };
export type { DirectResult };
