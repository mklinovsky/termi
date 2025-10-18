import { z } from "zod";
import { ToolFn } from "../types.ts";
import { walk } from "@std/fs";
import { relative } from "node:path";

export const listFilesToolDefinition = {
  name: "list_files_in_current_directory",
  description: "Recursively list all files in current working directory",
  parameters: z.object({}),
};

type Args = z.infer<typeof listFilesToolDefinition.parameters>;

export const listFiles: ToolFn<Args, string> = async (
  { toolArgs: _toolArgs },
) => {
  const files = [];
  const dir = Deno.cwd();

  for await (const entry of walk(dir, { skip: [/node_modules/, /\.git/] })) {
    files.push(relative(dir, entry.path));
  }

  return files.join("\n");
};
