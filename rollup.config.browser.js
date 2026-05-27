import terser from "@rollup/plugin-terser";
import progress from "rollup-plugin-progress";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pluginJson from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/whatsapp-api-client.min.js",
      format: "umd",
      exports: "default",
      name: "whatsAppClient",
      plugins: [terser()],
      globals: {
        fs: "fs",
        mime: "mime"
      },
    },
  ],
  plugins: [
    progress({ clearLine: true }),
    resolve({ browser: true }),
    commonjs({ include: "node_modules/**" }),
    pluginJson(),
  ],
  external: ["fs", "mime"],
  onwarn(warning, warn) {
    if (warning.code === "MISSING_NODE_BUILTINS" && warning.message.includes('"fs"')) {
      return;
    }
    warn(warning);
  }
};