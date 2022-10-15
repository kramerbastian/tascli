import { Adapter } from "../types.ts";

const editProject = (
  props: [string, "name", string],
  provider: Adapter,
) => {
  provider.editProject(props[0], props[1], props[2]);
};

export default editProject;
