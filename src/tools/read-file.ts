import { z } from "zod";
import { ToolFn } from "../types.ts";
import { resolve } from "node:path";

export const readFileToolDefinition = {
  name: "read_file",
  description: "Read the content of a file at the given path.",
  parameters: z.object({
    path: z.string().describe("The path of the file to read"),
  }),
};

type Args = z.infer<typeof readFileToolDefinition.parameters>;

export const readFile: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { path } = toolArgs;

  try {
    const currentDir = Deno.cwd();
    const resolvedPath = resolve(currentDir, path);
    if (!resolvedPath.startsWith(currentDir)) {
      throw new Error("Path escapes the current directory");
    }

    // Read the file
    const content = await Deno.readTextFile(resolvedPath);
    return content;
  } catch (error) {
    return `Error reading file: ${error}`;
  }
};
