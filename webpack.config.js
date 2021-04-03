// Very informative : https://medium.com/swlh/a-complete-webpack-setup-for-react-e56a2edf78ae

const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: "./root/frontend/src/index.js",
    output: {
        path: path.join(__dirname, "/root/frontend/dist"),
        filename: "bundle.js",
        chunkFilename: "[id].js",
        publicPath: "",
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName:
                                    "[name]__[local]___[hash:base64:5]",
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["autoprefixer", {}]],
                            },
                        },
                    },
                    { loader: "sass-loader" },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader?limit=10000&name=img/[name].[ext]",
            },
            // {
            //     enforce: "pre",
            //     include: path.appSrc,
            //     test: /\.(js|jsx|mjs)$/,
            //     use: [
            //         {
            //             loader: require.resolve("eslint-loader"),
            //             options: {
            //                 formatter: eslintFormatter,
            //                 eslintPath: require.resolve("eslint"),
            //                 emitWarning: true,
            //             },
            //         },
            //     ],
            // },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/root/frontend/public/index.html",
            filename: "index.html",
            inject: "body",
        }),
        // new ESLintPlugin({
        //     // Plugin options
        //     extensions: ["js", "mjs", "jsx", "ts", "tsx"],
        //     formatter: require.resolve("react-dev-utils/eslintFormatter"),
        //     eslintPath: require.resolve("eslint"),
        //     context: path.appSrc,
        //     failOnError: false,
        //     emitWarning: true,
        //     // ESLint class options
        //     cwd: path.appPath,
        //     resolvePluginsRelativeTo: __dirname,
        //     baseConfig: {
        //         extends: [require.resolve("eslint-config-react-app/base")],
        //         rules: {
        //             ...(!hasJsxRuntime && {
        //                 "react/react-in-jsx-scope": "error",
        //             }),
        //         },
        //     },
        // }),
    ],
};
