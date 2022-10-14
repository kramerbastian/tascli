import { Color } from "../types.ts";

const colors: { name: string; code: string }[] = [{
  name: "red",
  code: "\x1b[31m",
}, {
  name: "green",
  code: "\x1b[32m",
}, {
  name: "grey",
  code: "\x1b[2m",
}, {
  name: "cyan",
  code: "\x1b[36m",
}, {
  name: "yellow",
  code: "\x1b[33m",
}];

const boldCode = "\x1b[1m";

const resetCode = "\x1b[0m";

const color = (color: Color, text: string, bold?: boolean) => {
  let colorCode;

  colors.forEach((c) => {
    if (c.name === color) {
      colorCode = c.code;
    } else if (color === "default") {
      colorCode = "";
    }
  });

  return ((bold) ? boldCode : "") + colorCode + text + resetCode;
};

export default color;
