import color from "../helpers/colors.ts";
import { Adapter } from "../types.ts";

const list = (adapter: Adapter) => {
  const tasks = adapter.getTasks().tasks;
  const longestProjectNameLength =
    Object.keys(tasks).reduce((a, b) => a.length > b.length ? a : b).length;

  // iterate over the all projects in the task object
  Object.keys(tasks).forEach((project, i) => {
    let spaces = "";
    for (let i = 0; i < longestProjectNameLength - project.length; i++) {
      spaces += " ";
    }

    // print the project name
    console.log(
      project[0].toUpperCase() + project.slice(1) + ": " +
        color("grey", "[" + tasks[project].length + "]"),
    );

    const longestTaskNameLength = tasks[project].reduce((a, b) =>
      a.name.length > b.name.length ? a : b
    ).name.length;

    // iterate over all tasks in the project
    tasks[project].forEach((task, n) => {
      let spaces = "";
      for (let i = 0; i < longestTaskNameLength - task.name.length; i++) {
        spaces += " ";
      }

      // print the task
      console.log(
        " " + color("grey", "[") +
          (task.completed ? color("green", "*") : " ") +
          color("grey", "]") + " " +
          ((task.completed) ? color("grey", task.name) : task.name) + spaces +
          color(task.tag, (task.tag !== "default") ? " ⚫" : "") +
          (n + 1 === tasks[project].length &&
              i + 1 !== Object.keys(tasks).length
            ? "\n"
            : ""),
      );
    });
  });
};

export default list;
