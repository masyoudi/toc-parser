"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOCParser = void 0;
var tslib_1 = require("tslib");
var TOCParser = /** @class */ (function () {
    function TOCParser(selector, options) {
        this.selector = selector;
        this.options = options;
    }
    TOCParser.prototype.setAttrs = function (elements, callback) {
        var _this = this;
        elements.forEach(function (node, i) {
            var sub = Array.from(node.childNodes);
            var uniqueId = function (str, index) {
                return str.replace(/[^A-Z]+/gi, "").toLowerCase() + "-" + index;
            };
            if (sub.length)
                _this.setAttrs(sub, callback);
            if (node.dataset && Object.keys(node.dataset).indexOf("toc") !== -1) {
                node.setAttribute("id", uniqueId(node.textContent, i));
                callback({
                    id: node.getAttribute("id"),
                    level: parseInt(node.getAttribute("data-toc")),
                    title: node.textContent.trim(),
                });
            }
        });
    };
    /**
     * Create HTML string
     */
    TOCParser.prototype.parse = function () {
        var element = document.querySelector(this.selector);
        var classes = tslib_1.__assign({}, this.options.customClass);
        if (!element) {
            throw Error("Invalid selector");
        }
        var headers = [];
        var contents = Array.from(element.childNodes);
        this.setAttrs(contents, function (opt) { return headers.push(opt); });
        var setClass = function (str) { return (str ? "class=\"".concat(str, "\"") : ""); };
        var listItem = function (item) {
            var a = "<a ".concat(setClass(classes.a), " href=\"#").concat(item.id, "\">").concat(item.title, "</a>");
            return "<li ".concat(setClass(classes.li), ">").concat(a, "</li>");
        };
        var prev = 1;
        var html = "";
        headers.forEach(function (header) {
            if (header.level === prev) {
                html += listItem(header);
            }
            else if (header.level < prev) {
                html += "</ol>".repeat(prev - header.level) + listItem(header);
            }
            else {
                html += "<ol ".concat(setClass(classes.ol), ">").concat(listItem(header));
            }
            prev = header.level;
        });
        return "<ol ".concat(setClass(classes.ol), ">").concat(html, "</ol>");
    };
    /**
     * Render HTML string to specific element
     */
    TOCParser.prototype.render = function () {
        var target = document.querySelector(this.options.target);
        if (!target) {
            throw Error("Invalid selector");
        }
        target.innerHTML = String(this.parse());
    };
    return TOCParser;
}());
exports.TOCParser = TOCParser;
exports.default = TOCParser;
