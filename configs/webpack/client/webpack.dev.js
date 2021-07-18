const path = require('path');

const {assets, css, babel} = require('../modules');
const plugins = require('../plugins');

const {PATHS, REG_EXP} = require('../../constants');

module.exports = {
    mode: 'development',
    entry: {
        main: ['react-hot-loader/patch', path.join(PATHS.client, 'index.tsx')],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        globalObject: 'self',
        path: PATHS.dist,
    },
    target: 'web',
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            client: path.resolve(__dirname, '../../../client'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [babel.dev, css.dev, ...assets.dev],
    },
    plugins: plugins.dev,
    devServer: {
        host: 'localhost',
        hot: true,
        hotOnly: true,
        contentBase: PATHS.dist,
        compress: true,
        liveReload: true,
        watchContentBase: true,
        progress: true,
        port: 3000,
        writeToDisk: false,
        watchOptions: {
            aggregateTimeout: 3000,
            poll: 5000,
            ignored: REG_EXP.node_modules,
        },
    },
    performance: {
        hints: false,
    },
    optimization: {
        nodeEnv: 'development',
        emitOnErrors: true,
        moduleIds: 'named',
        runtimeChunk: 'single',
        innerGraph: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 1,
                },
            },
        },
    },
};
