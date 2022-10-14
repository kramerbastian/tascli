import {
  parse,
  stringify,
} from "https://deno.land/std@0.159.0/encoding/yaml.ts?doc=";

import color from "../helpers/colors.ts";
import { Color, Config, Task } from "../types.ts";

const fileLocation = Deno.env.get("HOME") + "/.config/tascli/config.yml";

const configTemplate = {
  tasks: {
    default: [],
  },
};

// Check if the config file exists and create it if it doesn't
const checkFileLocation = async () => {
  try {
    await Deno.stat(fileLocation);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      Deno.create(fileLocation);
      Deno.writeTextFile(fileLocation, stringify(configTemplate));
    } else {
      throw error;
    }
  }
};

const filesystemAdapter = {
  addTask: (name: string, project?: string, tag?: Color) => {
    checkFileLocation();
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;
    data.tasks[(project) ? project : "default"].push({
      name: name,
      tag: (tag) ? tag : "default",
      completed: false,
      id: Math.floor(Math.random() * 9000) + 1000,
    });
    Deno.writeTextFileSync(fileLocation, stringify(data));
  },

  getTasks: () => {
    checkFileLocation();
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;
    return data;
  },

  deleteTask: (id: number) => {
    checkFileLocation();
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;

    try {
      Object.keys(data.tasks).forEach((project) => {
        data.tasks[project] = data.tasks[project].filter((task) =>
          task.id !== id
        );
      });
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.error(
        color("red", "  error", true) +
          color("red", ": " + error.message, false),
      );
    }
    Deno.writeTextFileSync(fileLocation, stringify(data));
  },

  editTask: (id: number, type: "tag" | "name" | "completed", value: string) => {
    checkFileLocation();
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;

    Object.keys(data.tasks).forEach((project) => {
      const task = data.tasks[project].find((task) => task.id === id);
      if (task !== undefined) {
        // @ts-ignore - I know this is bad practice, but I don't know how to fix it
        task[type] = (type === "completed") ? (value === "true") : value;
      }
    });

    Deno.writeTextFileSync(fileLocation, stringify(data));
  },

  addProject: (name: string) => {
    checkFileLocation()
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;

    data.tasks[name] = [];

    Deno.writeTextFileSync(fileLocation, stringify(data));
  },

  deleteProject: (name: string) => {
    checkFileLocation()
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;

    delete data.tasks[name];

    Deno.writeTextFileSync(fileLocation, stringify(data));
  },

  editProject: (name: string, type: "name", value: string) => {
    checkFileLocation()
    const data = parse(Deno.readTextFileSync(fileLocation)) as Config;

    if (name !== value) {
      // @ts-ignore - I know this is bad practice, but I don't know how to fix it
      Object.defineProperty(data.tasks, value, Object.getOwnPropertyDescriptor(data.tasks, name));
      delete data.tasks[name];
  }


    Deno.writeTextFileSync(fileLocation, stringify(data));
  }
};

export default filesystemAdapter;
