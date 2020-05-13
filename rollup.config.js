import { terser } from "rollup-plugin-terser";
import progress from 'rollup-plugin-progress';

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/bundle.js',
            format: 'cjs'
        },
        {
            file: 'lib/whats-app-client.min.js',
            format: 'umd',
            exports: 'default',
            name: 'whatsAppClient',
            plugins: [terser()]
        }
    ],
    plugins: [
        progress({
            clearLine: false // default: true
        })
    ]
};