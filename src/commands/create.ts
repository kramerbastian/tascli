import { Color, Config, Adapter } from "../types.ts";

const create = (args: [string, string?, ("red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "grey" | undefined)?], provider: Adapter) => {
  provider.addTask(args[0], args[1], args[2]);
};

export default create;
