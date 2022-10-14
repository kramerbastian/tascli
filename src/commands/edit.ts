import { Adapter, Color, Config } from "../types.ts";

const editTask = (
  props: [number, "tag" | "name" | "completed", string],
  provider: Adapter,
) => {
  provider.editTask(props[0], props[1], props[2]);
};

export default editTask;
