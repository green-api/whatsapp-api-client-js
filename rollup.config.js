import { terser } from "rollup-plugin-terser";

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'lib/bundle.js',
        format: 'umd',
        exports: 'default',
        name: 'whatsAppClient'
    },
    plugins: [terser()]
};