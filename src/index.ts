type Options = {
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

  constructor(selector: string, options: Options) {
    this.selector = selector;
    this.options = options;
  }

  setAttrs(elements: any, callback: Function) {
    elements.forEach((node: any, i: number) => {
      let sub = Array.from(node.childNodes);
      let uniqueId = (str: string, index: number) => {
        return str.replace(/[^A-Z]+/gi, "").toLowerCase() + "-" + index;
      };
      if (sub.length) this.setAttrs(sub, callback);

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

  render() {
    let element = document.querySelector(this.selector);
    let target = document.querySelector(this.options.target);
    let classes = { ...this.options.customClass };
    if (!element || !target) {
      throw Error("Invalid selector");
    }

    let headers: Array<{ id: string; level: number; title: string }> = [];
    let contents = Array.from(element.childNodes);
    this.setAttrs(contents, (opt: any) => headers.push(opt));

    let listItem = (item: any) => {
      return `<li class="${classes.li}"><a class="${classes.a}" href="#${item.id}">${item.title}</a></li>`;
    };
    let prev = 1;
    let html = "";

    headers.forEach((header) => {
      if (header.level === prev) {
        html += listItem(header);
      } else if (header.level < prev) {
        html += "</ol>".repeat(prev - header.level) + listItem(header);
      } else {
        html += `<ol class="${classes.ol}">${listItem(header)}`;
      }

      prev = header.level;
    });

    target.innerHTML = `<ol class="${classes.ol}">${html}</ol>`;
  }
}
