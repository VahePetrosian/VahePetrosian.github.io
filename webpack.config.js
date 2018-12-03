let path = require ('path');

let conf = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js&/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader'
                }, {
                  loader: 'less-loader'
                }]
            }
        ]
    },
    devtool: 'eval-sourcemap'
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    conf.devtool = production ? 'false' : 'eval-sourcemap';
    return conf;
};