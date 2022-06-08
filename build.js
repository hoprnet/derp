import path from "path";
import { fileURLToPath } from "url";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

build({
  bundle: true,
  sourcemap: true,
  format: "esm",
  target: "esnext",
  entryPoints: [path.join(__dirname, "server", "index.ts")],
  outdir: path.join(__dirname, "dist"),
  outExtension: { ".js": ".mjs" },
  loader: {
    ".html": "text",
    ".gif": "binary",
    ".png": "binary",
  },
  external: ["__STATIC_CONTENT_MANIFEST"],
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
