const {REG_EXP} = require('../../constants');

const getConfig = (filePath, publicPath) => [
    {
        test: REG_EXP.images,
        type: 'asset/resource',
        generator: {
            emit: true,
            filename: `images/${filePath}`,
            publicPath: publicPath,
        },
    },
    {
        test: REG_EXP.fonts,
        type: 'asset/resource',
        generator: {
            emit: true,
            filename: `fonts/${filePath}`,
            publicPath: publicPath,
        },
    },
];

module.exports = {
    dev: getConfig('[name][ext]', '/'),
    prod: getConfig('[name].[contenthash][ext]', '/'),
};
