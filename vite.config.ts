import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { readFileSync } from "node:fs";

function getPathsFromTsConfig() {
  const tsconfig = JSON.parse(readFileSync("./tsconfig.json", "utf-8"));
  const aliases: Record<string, string> = {};
  const paths: Record<string, [string]> = tsconfig.compilerOptions.paths;

  for (const [key, value] of Object.entries(paths)) {
    const cleanKey = key.replace("/*", "");
    const cleanValue = value[0].replace("/*", "");
    const resolvedPath = path.resolve(__dirname, cleanValue);
    aliases[cleanKey] = resolvedPath;
  }

  return aliases;
}

export default defineConfig({
  resolve: {
    alias: getPathsFromTsConfig(),
  },
  plugins: [react(), tailwindcss()],
});
