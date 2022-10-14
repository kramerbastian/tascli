import { parse, stringify, Type } from "https://deno.land/std@0.159.0/encoding/yaml.ts?doc=";
import color from "../helpers/colors.ts";
import { Color, Config, Task } from "../types.ts";

const filesystemAdapter = {
  
  addTask: (name: string, project?: string, tag?: Color) => {
    const data = parse(Deno.readTextFileSync("./tasks.yml")) as Config;
    data.tasks[(project) ? project : "default"].push({name: name, tag: (tag) ? tag : "default", completed: false, id: Math.floor(Math.random() * 9000) + 1000});
    Deno.writeTextFileSync("./tasks.yml", stringify(data));
  },

  getTasks: () => {
    const data = parse(Deno.readTextFileSync("./tasks.yml")) as Config;
    return data;
  },

  deleteTask: (id: number) => {
    const data = parse(Deno.readTextFileSync("./tasks.yml")) as Config;

    try {
      Object.keys(data.tasks).forEach((project) => {
        data.tasks[project] = data.tasks[project].filter((task) => task.id !== id);
      });
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error){ message = error.message}
      console.error(color("red", "  error", true) + color("red", ": " + error.message, false)); 
    }
    Deno.writeTextFileSync("./tasks.yml", stringify(data));
  },

  editTask: (id: number, type: "tag" | "name" | "completed", value: string) => {
    const data = parse(Deno.readTextFileSync("./tasks.yml")) as Config;

    Object.keys(data.tasks).forEach((project) => {
      const task = data.tasks[project].find((task) => task.id === id);
      if (task !== undefined) {
        // @ts-ignore - I know this is bad practice, but I don't know how to fix it
        task[type] = (type === "completed") ? (value === "true") : value;
      }
    });

    Deno.writeTextFileSync("./tasks.yml", stringify(data));
  }
};

export default filesystemAdapter;
