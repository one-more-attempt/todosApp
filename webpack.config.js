const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-in.html',
            template: 'src/components/sign-in/sign-in.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'main.html',
            template: 'src/components/main/main.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-up.html',
            template: 'src/components/sign-up/sign-up.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'find-users.html',
            template: 'src/components/find-users/find-users.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'user-details.html',
            template: 'src/components/user-details/user-details.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'profile.html',
            template: 'src/components/profile/profile.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: true
                        }
                    }
                ]
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './')
        },
        compress: true,
        port: 4200
    }
};
