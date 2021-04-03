module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        ["@babel/preset-react", { targets: { node: "current" } }], // add this
    ],
};
// {
//     "presets": ["@babel/preset-react", "@babel/preset-env"],
//     "plugins": [
//         "@babel/plugin-transform-react-jsx",
//         "@babel/plugin-syntax-jsx"
//     ],
//     "loose": true
// }
