var path = require("path");
module.exports = {
    entry: {
        bundle: ["./components/**.*"]
    },
    context: path.resolve(__dirname),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "temp")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", "jsx"]
    }
};
