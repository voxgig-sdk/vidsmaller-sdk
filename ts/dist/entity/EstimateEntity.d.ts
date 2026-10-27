import { VidsmallerEntityBase } from '../VidsmallerEntityBase';
import type { VidsmallerSDK } from '../VidsmallerSDK';
import type { Control } from '../types';
import type { Estimate, EstimateListMatch, EstimateCreateData } from '../VidsmallerTypes';
declare class EstimateEntity extends VidsmallerEntityBase<Estimate> {
    constructor(client: VidsmallerSDK, entopts: any);
    make(this: EstimateEntity): EstimateEntity;
    list(this: any, reqmatch?: EstimateListMatch, ctrl?: Control): Promise<EstimateEntity[]>;
    create(this: any, reqdata?: EstimateCreateData, ctrl?: Control): Promise<EstimateEntity>;
}
export { EstimateEntity };
