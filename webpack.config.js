const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();
const HtmlWebpackPlugin = require("html-webpack-plugin");

const AppName = "Future Sync";

module.exports = (env, argv) => ({
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename:
            argv.mode !== "production"
                ? `${AppName}.dev.js`
                : `${AppName}.${gitRevisionPlugin.version()}.js`
    },
    devServer: {
        contentBase: "./build",
        port: 1337,
        hot: true
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/react", "@babel/env"],
                    plugins: [
                        process.env.NODE_ENV !== "production"
                            ? ["emotion", { hoist: true }]
                            : ["emotion", { sourceMap: true, autoLabel: true }]
                        // "transform-class-properties",
                        // "transform-object-rest-spread"
                    ]
                }
            },
            {
                test: /\.[s]?css$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    // 'resolve-url-loader',
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-sprite-loader"
                        // options: {
                        //     extract: true,
                        //     spriteFilename: "icons/iconsprite.svg.php",
                        //     path: path.resolve(__dirname, "assets")
                        // }
                    },
                    "svgo-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // path: path.resolve(__dirname, 'assets/css'),
                            name: "fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: AppName, template: "demo/index.html" }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            path: path.resolve(__dirname, "build/css"),
            filename: "app.css",
            chunkFilename: "[id].css"
        }),
        new SpriteLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
