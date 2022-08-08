declare type Options = {
    target: string;
    customClass: {
        ol: string;
        li: string;
        a: string;
    };
};
export declare class TOCParser {
    selector: string;
    options: Options;
    constructor(selector: string, options: Options);
    setAttrs(elements: any, callback: Function): void;
    /**
     * Create HTML string
     */
    parse(): string;
    /**
     * Render HTML string to specific element
     */
    render(): void;
}
export default TOCParser;
