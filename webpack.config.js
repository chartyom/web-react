const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
//const Autoprefixer = require('autoprefixer-stylus');

module.exports = {
    entry: './src/client/app.jsx',
    output: {
        path: './public/js',
        filename: 'app.js'
    },
    // автозапуск после внесения изменений
    watch: true,
    watchOptions: {
        // задержка в мс запуска программы после сохранения файла с изменениями
        aggregateTimeout: 200
    },
    // различные способы проверки (debug) кода
    devtool: NODE_ENV == 'development' ? 'source-map' : null,
    // Поиск require модулей 
    resolve: {
        modulesDirectories: ['node_modules', 'src/client'],
        //extensions: ['', '.js', '.jsx', '.css', '.styl']
        extensions: ['', '.js', '.jsx']
    },
    // Поиск loader модулей
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js'],
    },
    plugins: [
        //добавляет глобальные переменные в клиентскую часть
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        //Минимизирует код
        new webpack.optimize.UglifyJsPlugin({
            compress: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                // этот loader будет запускаться только в директории src/client, чтобы минимизировать кол-во запусков loader
                include: [
                    path.resolve(process.cwd(), 'src/client')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            }
            // {
            //     test: /\.styl$/,
            //     include: [
            //         path.resolve(process.cwd(), 'client')
            //     ],
            //     loader: 'stylus-loader'
            // }
        ]
    }
    // stylus: {
    //     use: [Autoprefixer({
    //         browser: ['last 2 versions'] // настраиваем автопрефиксер
    //     })]
    // }
};