const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {REG_EXP} = require('../../constants');

const MINI_CSS_LOADER = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '/',
    },
};

const POST_CSS_LOADER = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: ['autoprefixer'],
        },
    },
};

const CSS_LOADER = {
    loader: 'css-loader',
    options: {
        modules: {
            compileType: 'module',
            localIdentName: '[local]__[hash:base64:5]',
        },
    },
};

const SASS_LOADER = {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
    },
};

const CONFIG = {
    test: REG_EXP.css,
    use: [MINI_CSS_LOADER, CSS_LOADER, SASS_LOADER, POST_CSS_LOADER],
};

module.exports = {
    dev: CONFIG,
    prod: CONFIG,
};
