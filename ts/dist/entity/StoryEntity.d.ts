import { GenrenatorEntityBase } from '../GenrenatorEntityBase';
import type { GenrenatorSDK } from '../GenrenatorSDK';
import type { Control } from '../types';
import type { Story, StoryLoadMatch } from '../GenrenatorTypes';
declare class StoryEntity extends GenrenatorEntityBase<Story> {
    constructor(client: GenrenatorSDK, entopts: any);
    make(this: StoryEntity): StoryEntity;
    load(this: any, reqmatch?: StoryLoadMatch, ctrl?: Control): Promise<StoryEntity>;
}
export { StoryEntity };
