import { VidsmallerEntityBase } from '../VidsmallerEntityBase';
import type { VidsmallerSDK } from '../VidsmallerSDK';
import type { Control } from '../types';
import type { Upload, UploadCreateData } from '../VidsmallerTypes';
declare class UploadEntity extends VidsmallerEntityBase<Upload> {
    constructor(client: VidsmallerSDK, entopts: any);
    make(this: UploadEntity): UploadEntity;
    create(this: any, reqdata?: UploadCreateData, ctrl?: Control): Promise<UploadEntity>;
}
export { UploadEntity };
