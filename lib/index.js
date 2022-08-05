"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TOCParser {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
    }
    setAttrs(elements, callback) {
        elements.forEach((node, i) => {
            let sub = Array.from(node.childNodes);
            let uniqueId = (str, index) => {
                return str.replace(/[^A-Z]+/gi, "").toLowerCase() + "-" + index;
            };
            if (sub.length)
                this.setAttrs(sub, callback);
            if (node.dataset && Object.keys(node.dataset).indexOf("toc") !== -1) {
                node.setAttribute("id", uniqueId(node.textContent, i));
                callback({
                    id: node.getAttribute("id"),
                    level: parseInt(node.getAttribute("data-toc")),
                    title: node.textContent.trim(),
                });
            }
        });
    }
    /**
     * Create HTML string
     */
    parse() {
        let element = document.querySelector(this.selector);
        let classes = Object.assign({}, this.options.customClass);
        if (!element) {
            throw Error("Invalid selector");
        }
        let headers = [];
        let contents = Array.from(element.childNodes);
        this.setAttrs(contents, (opt) => headers.push(opt));
        let setClass = (str) => (str ? `class="${str}"` : "");
        let listItem = (item) => {
            let a = `<a ${setClass(classes.a)} href="#${item.id}">${item.title}</a>`;
            return `<li ${setClass(classes.li)}>${a}</li>`;
        };
        let prev = 1;
        let html = "";
        headers.forEach((header) => {
            if (header.level === prev) {
                html += listItem(header);
            }
            else if (header.level < prev) {
                html += "</ol>".repeat(prev - header.level) + listItem(header);
            }
            else {
                html += `<ol ${setClass(classes.ol)}>${listItem(header)}`;
            }
            prev = header.level;
        });
        return `<ol ${setClass(classes.ol)}>${html}</ol>`;
    }
    /**
     * Render HTML string to specific element
     */
    render() {
        let target = document.querySelector(this.options.target);
        if (!target) {
            throw Error("Invalid selector");
        }
        target.innerHTML = String(this.parse());
    }
}
exports.default = TOCParser;
