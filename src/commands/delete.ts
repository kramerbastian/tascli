import { Adapter, Color, Config } from "../types.ts";

const deleteTask = (id: [number], provider: Adapter) => {
  provider.deleteTask(id[0]);
};

export default deleteTask;
