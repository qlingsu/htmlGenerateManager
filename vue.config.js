var appConfig = require("./public/appConfig")
var styleVariables = appConfig.style;

module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        port: appConfig.port
    },
    pages:{
        index:{
            entry:"src/main.js",
            template:"public/index.html",
            filename:"index.html",
            title:appConfig.title,
            faviconPath:"public/favicon.ico"
        },
        mobile:{
            entry:"src/mobile.js",
            template:"public/mobile.html",
            filename:"mobile.html",
            title:"数据展示",
            faviconPath:"public/favicon.ico"
        }
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.scss$/,
                use: [{
                    loader: 'sass-loader',
                    options: {
                        additionalData: Object.keys(styleVariables)
                            .map(k => `\$${k}: ${styleVariables[k]};`)
                            .join('\n')
                    }
                }]
            }]
        }
    },
}