const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {PATHS} = require('../../constants');

const getCssPlugin = filename => new MiniCssExtractPlugin({filename, chunkFilename: filename});

const CLEAN_PLUGIN = new CleanWebpackPlugin({cleanStaleWebpackAssets: false});

const DEFINE_PLUGIN = new DefinePlugin({
    __IS_PRODUCTION__: process.env.NODE_ENV === 'production' ? true : false,
});

const HTML_PLUGIN = new HtmlWebpackPlugin({
    title: 'Find your dog',
    filename: 'index.html',
    template: 'client/html/index.ejs',
    inject: false,
    templateParameters: (compilation, assets, assetTags, options) => ({
        compilation,
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
            tags: {
                headTags: assetTags.headTags.filter(tag => ['link', 'style'].includes(tag.tagName)),
                bodyTags: assetTags.headTags.filter(tag => ['script'].includes(tag.tagName)),
            },
            files: assets,
            options,
        },
    }),
});

const COPY_PLUGIN = new CopyWebpackPlugin({
    patterns: [{from: './assets/icons', to: path.join(PATHS.dist, '/icons')}],
});

module.exports = {
    dev: [CLEAN_PLUGIN, COPY_PLUGIN, DEFINE_PLUGIN, getCssPlugin('[name].css'), HTML_PLUGIN],
    prod: [CLEAN_PLUGIN, COPY_PLUGIN, DEFINE_PLUGIN, getCssPlugin('[name].[contenthash].css'), HTML_PLUGIN],
};
