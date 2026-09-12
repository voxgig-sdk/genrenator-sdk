import { Context } from './Context';
declare class GenrenatorError extends Error {
    isGenrenatorError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { GenrenatorError };
