import progress from 'rollup-plugin-progress';

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/bundle.js',
            format: 'cjs'
        },
        
    ],
    plugins: [
        progress({
            clearLine: true
        }),
    ]
};