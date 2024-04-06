interface IConvertType {
    message: string;
}
/**
 * Get data and create form element.
 * @param id HTMLElement identification
 */
export declare function exchanges(id: string): Promise<IConvertType>;
export {};
