import progress from "rollup-plugin-progress";

module.exports = {
  input: "src/index.js",
  output: [
    {
      file: "lib/bundle.js",
      format: "cjs",
      exports: "default",
      globals: {
        fs: "fs",
        axios: "axios",
      },
    },
  ],
  plugins: [
    progress({
      clearLine: true,
    }),
  ],
  external: ["fs", "axios"],
};
