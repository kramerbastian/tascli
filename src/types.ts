export type Color = "default" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "grey";

export type Config = {
    tasks: Projects;
}

export type Projects = {
    [key: string]: Task[];
}

export type Task = {
    name: string;
    id: number;
    tag: Color;
    completed: boolean;
}

export type Adapter = {
    addTask: (name: string, project?: string, tag?: Color) => void;
    getTasks: () => Config;
    deleteTask: (i: number) => void,
    editTask: (id: number, type: "tag" | "name" | "completed", value: string) => void;
}