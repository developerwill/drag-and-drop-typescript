const path = require('path');

module.exports = {
    entry: './src/App.ts',
    output: {
        fileName: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};