import { Command, CompletionsCommand, EnumType } from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";

import create from "./commands/create.ts";
import list from "./commands/list.ts";

import filesystemAdapter from "./adapters/filesystem.ts";
import deleteTask from "./commands/delete.ts";
import editTask from "./commands/edit.ts";

const tagType = new EnumType([ "red", "green", "yellow", "blue", "magenta", "cyan", "white", "grey" ]);
const editType = new EnumType([ "tag", "name", "completed" ]);

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
  .action((options, ...args) => create(args, filesystemAdapter))

  .command("task:delete")
  .alias("td")
  .description("Delete a task.")
  .arguments("<id:number>")
  .action((options, ...args) => deleteTask(args, filesystemAdapter))

  .command("task:edit")
  .type("EditType", editType)
  .alias("te")
  .description("Edit a task.")
  .arguments("<id:number> <type:EditType> <value:string>")
  .action((options, ...args) => editTask(args, filesystemAdapter))

  .parse(Deno.args);
