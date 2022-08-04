declare type Options = {
    target: string;
    customClass: {
        ol: string;
        li: string;
        a: string;
    };
};
export default class TOCParser {
    selector: string;
    options: Options;
    constructor(selector: string, options: Options);
    setAttrs(elements: any, callback: Function): void;
    render(): void;
}
export {};
