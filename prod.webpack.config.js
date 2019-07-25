const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = () => ({
    entry: './wp-content/themes/think/src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'wp-content/themes/think/js'),
        filename: '[name].js',
        // Public path is important for dynamic imports. It'll help webpack to retrieve bundles by name and not by ids
        publicPath: '/wp-content/themes/think/js/',
        chunkFilename: '[name].js',
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
            filename: '../css/[name].css',
        }),
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
});

const loader = (env, options) => {
    const MODE = options.mode;
    return {
        entry: './wp-content/themes/think/src/js/load/loading-script.js',
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
