import { Color, Config, Adapter } from "../types.ts";

const deleteTask = (id:[number], provider: Adapter) => {
    provider.deleteTask(id[0]);
};

export default deleteTask;
