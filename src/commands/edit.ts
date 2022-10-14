import { number } from "https://deno.land/x/cliffy@v0.25.2/flags/types/number.ts";
import { Color, Config, Adapter } from "../types.ts";

const editTask = (props: [number, "tag" | "name" | "completed", string], provider: Adapter) => {
    provider.editTask(props[0], props[1], props[2]);
};

export default editTask;
