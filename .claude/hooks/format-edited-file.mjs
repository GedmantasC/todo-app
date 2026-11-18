// Claude Code hook: after the agent edits or writes a file, format it with Prettier.
// The agent's edits then look like everyone else's, without anyone asking.
// Claude Code passes the tool call as JSON on stdin; we only need the file path.
import { readFileSync, writeFileSync } from "node:fs";
import * as prettier from "prettier";

try {
  const input = JSON.parse(readFileSync(0, "utf8"));
  const file = input?.tool_input?.file_path;
  if (file && !file.includes("node_modules")) {
    const info = await prettier.getFileInfo(file, { ignorePath: ".prettierignore" });
    if (!info.ignored && info.inferredParser) {
      const source = readFileSync(file, "utf8");
      const options = (await prettier.resolveConfig(file)) ?? {};
      const formatted = await prettier.format(source, { ...options, filepath: file });
      if (formatted !== source) writeFileSync(file, formatted);
    }
  }
} catch {
  // A formatting problem must never block the agent's edit.
}
