import { Command, CompletionsCommand, EnumType } from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";

import filesystemAdapter from "./adapters/filesystem.ts";

import create from "./commands/create.ts";
import list from "./commands/list.ts";
import editTask from "./commands/edit.ts";
import deleteTask from "./commands/delete.ts";
import createProject from "./commands/createProject.ts";
import editProject from "./commands/editProject.ts";
import deleteProject from "./commands/deleteProject.ts";

const tagType = new EnumType([ "red", "green", "yellow", "blue", "magenta", "cyan", "white", "grey" ]);
const taskEditType = new EnumType([ "tag", "name", "completed" ]);
const projectEditType = new EnumType([ "name" ]);

await new Command()

  .name("tascli")
  .version("0.1.0")
  .description("A simple task manager for the command line with extensible features.")

  .action(() => list(filesystemAdapter))
  
  .command("completions", new CompletionsCommand())

  .command("task:create")
  .type("tagType", tagType)
  .alias("tc")
  .description("Create a new task.")
  .arguments("<name:string> [project:string] [tag:tagType]")
  .complete("color", () => [ "red", "green", "yellow", "blue", "magenta", "cyan", "white", "grey" ])
  .action((_options, ...args) => create(args, filesystemAdapter))

  .command("task:delete")
  .alias("td")
  .description("Delete a task.")
  .arguments("<id:number>")
  .action((_options, ...args) => deleteTask(args, filesystemAdapter))

  .command("task:edit")
  .type("EditType", taskEditType)
  .alias("te")
  .description("Edit a task.")
  .arguments("<id:number> <type:EditType> <value:string>")
  .action((_options, ...args) => editTask(args, filesystemAdapter))

  .command("project:create")
  .alias("pc")
  .description("Create a new project.")
  .arguments("<name:string>")
  .action((_options, ...args) => createProject(args, filesystemAdapter))

  .command("project:delete")
  .alias("pd")
  .description("Delete a project.")
  .arguments("<name:string>")
  .action((_options, ...args) => deleteProject(args, filesystemAdapter))

  .command("project:edit")
  .type("EditType", projectEditType)
  .alias("pe")
  .description("Edit a project.")
  .arguments("<name:string> <type:EditType> <value:string>")
  .action((_options, ...args) => editProject(args, filesystemAdapter))

  .parse(Deno.args);
