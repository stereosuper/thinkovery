const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = (env, options) => {
    const MODE = options.mode;
    return {
        entry: './wp-content/themes/think/src/js/main.js',
        output: {
            path: path.resolve(__dirname, 'wp-content/themes/think'),
            filename: './js/main.js',
            publicPath: '/wp-content/themes/think/',
            chunkFilename: 'js/[name].bundle.js',
        },
        devtool: '',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|otf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                publicPath: '/',
                                name: '[path][name].[ext]',
                                emitFile: false,
                            },
                        },
                    ],
                },
            ],
        },
        node: {
            fs: 'empty', // avoids error messages
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/main.css',
            }),
        ],
    };
};

const loader = (env, options) => {
    const MODE = options.mode;
    return {
        entry: './wp-content/themes/think/src/js/loading-script.js',
        output: {
            path: path.resolve(__dirname),
            filename: './wp-content/themes/think/js/loading-script.js',
            publicPath: '/wp-content/themes/think/js',
        },
        devtool: MODE === 'development' ? 'source-map' : '',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
        node: {
            fs: 'empty', // avoids error messages
        },
    };
};

module.exports = [config, loader];
