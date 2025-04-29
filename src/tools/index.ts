import { createFileToolDefinition } from "./create-file.ts";
import { imageToolDefinition } from "./generate-image.ts";
import { gitDiffToolDefinition } from "./git-diff.ts";
import { listFilesToolDefinition } from "./list-files.ts";
import { readFileToolDefinition } from "./read-file.ts";

export const tools = [
  imageToolDefinition,
  listFilesToolDefinition,
  createFileToolDefinition,
  readFileToolDefinition,
  gitDiffToolDefinition,
];
