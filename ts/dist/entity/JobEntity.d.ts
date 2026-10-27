import { VidsmallerEntityBase } from '../VidsmallerEntityBase';
import type { VidsmallerSDK } from '../VidsmallerSDK';
import type { Control } from '../types';
import type { Job, JobCreateData } from '../VidsmallerTypes';
declare class JobEntity extends VidsmallerEntityBase<Job> {
    constructor(client: VidsmallerSDK, entopts: any);
    make(this: JobEntity): JobEntity;
    create(this: any, reqdata?: JobCreateData, ctrl?: Control): Promise<JobEntity>;
}
export { JobEntity };
