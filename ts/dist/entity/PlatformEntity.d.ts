import { VidsmallerEntityBase } from '../VidsmallerEntityBase';
import type { VidsmallerSDK } from '../VidsmallerSDK';
import type { Control } from '../types';
import type { Platform, PlatformListMatch } from '../VidsmallerTypes';
declare class PlatformEntity extends VidsmallerEntityBase<Platform> {
    constructor(client: VidsmallerSDK, entopts: any);
    make(this: PlatformEntity): PlatformEntity;
    list(this: any, reqmatch?: PlatformListMatch, ctrl?: Control): Promise<PlatformEntity[]>;
}
export { PlatformEntity };
