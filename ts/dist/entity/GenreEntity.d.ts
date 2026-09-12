import { GenrenatorEntityBase } from '../GenrenatorEntityBase';
import type { GenrenatorSDK } from '../GenrenatorSDK';
import type { Control } from '../types';
import type { Genre, GenreLoadMatch } from '../GenrenatorTypes';
declare class GenreEntity extends GenrenatorEntityBase<Genre> {
    constructor(client: GenrenatorSDK, entopts: any);
    make(this: GenreEntity): GenreEntity;
    load(this: any, reqmatch?: GenreLoadMatch, ctrl?: Control): Promise<GenreEntity>;
}
export { GenreEntity };
