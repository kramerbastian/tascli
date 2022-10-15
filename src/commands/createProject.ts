import { Adapter, Color, Config } from "../types.ts";

const createProject = (
  args: [ string ],
  provider: Adapter,
) => {
  provider.addProject(args[0]);
};

export default createProject;
