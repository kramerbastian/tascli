import { Adapter } from "../types.ts";

const deleteProject = (name: [string], provider: Adapter) => {
  provider.deleteProject(name[0]);
};

export default deleteProject;
