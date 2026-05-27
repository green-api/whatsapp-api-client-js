import progress from "rollup-plugin-progress";

export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/bundle.js",
      format: "cjs",
      exports: "default",
      globals: {
        axios: "axios",
        fs: "fs",
        mime: "mime"
      },
    },
  ],
  plugins: [
    progress({
      clearLine: true,
    }),
  ],
  external: ["axios", "fs", "mime"],
};