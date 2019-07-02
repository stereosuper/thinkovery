const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = (env, options) => {
    const MODE = options.mode;
    return {
        cache: false,
        entry: './wp-content/themes/think/src/js/main.js',
        output: {
            path: path.resolve(__dirname),
            filename: './wp-content/themes/think/js/main.js',
            publicPath: '/wp-content/themes/think/js',
            sourceMapFilename: '[file].map?[contenthash]',
        },
        watch: true,
        devtool: MODE === 'development' ? 'source-map' : '',
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
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['last 2 versions'],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
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
                filename: './wp-content/themes/think/css/main.css',
            }),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://think.local/',
                files: [
                    {
                        match: ['**/*.php'],
                    },
                ],
            }),
        ],
    };
};

const loader = (env, options) => {
    const MODE = options.mode;
    return {
        cache: false,
        entry: './wp-content/themes/think/src/js/loading-script.js',
        output: {
            path: path.resolve(__dirname),
            filename: './wp-content/themes/think/js/loading-script.js',
            publicPath: '/wp-content/themes/think/js',
        },
        watch: true,
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
