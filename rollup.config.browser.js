import { terser } from "rollup-plugin-terser";
import progress from 'rollup-plugin-progress';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'
import pluginJson from '@rollup/plugin-json'

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/whatsapp-api-client.min.js',
            format: 'umd',
            exports: 'default',
            name: 'whatsAppClient',
            globals: {
                'axios': 'axios'
            },
            plugins: [
                terser()
            ]
        },
    ],
    plugins: [
        progress({
            clearLine: true
        }),
        resolve({
            browser: true,
        }), 
        commonJS({
            include: 'node_modules/**'
        }),
        pluginJson()
    ]
};