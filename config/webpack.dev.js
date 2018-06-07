const path = require("path")

module.exports = {
    // 入口: 有并且可以有多个
    entry:{
        // 必须是相对路径
        // 引入 babel-polyfill 转码 形式之一↓
        // main:["babel-polyfill","./src/main.js"]

        //   指定只转换某种的语法  这里只转换Promise
        main:["core-js/fn/promise","./src/main.js"]
    },
    // 打包环境: 开发 & 生产
    mode:"development",
    // 出口: 有并且只能有一个
    output:{
        // 当先得到结果就是 main-bundle.js
        filename:"[name]-bundle.js",
        path: path.resolve(__dirname,"../dist"),
        publicPath:""
    },
    // 本地服务器 
    devServer:{
        // 设置为默认进入 dist  文件夹
        contentBase:"dist",
        // 让页面上也显示出报错信息
        overlay:true
    },
    // 读取css规则 
    module:{
        //查找规则  rules 在webpack4之前的版本是loaders
        rules:[
            // js 转码配置
                {
                    test:/\.js$/,
                    use:[
                        {
                            // 使用babel-loader进行语法转换
                            loader:"babel-loader"
                        }
                    ],
                    // 忽略哪个文件不需要转换
                    exclude:/node_modules/
                },
            // css loaders
                {
                // 匹配css文件
                    test:/\.css$/,
                    // 找到之后对它进行加载,Use 中包含两个 一个是css-loader  style-loader
                    use:[{
                        // style-loader 就是把css写入html里去
                            loader:"style-loader"
                        },
                        {
                        // css-loader 就是把css样式放到 main-bunld.js里去11
                            loader:"css-loader"
                        }
                    ]
                },
                // html loaders
                {
                    test:/\.html$/,
                    use:[
                            {
                                // 负责文件起名
                                loader:"file-loader",
                                // 对应的配置信息
                                options:{
                                    // 对加载的文件进行起名,就是匹配到的名字
                                    name:"[name].html"
                                }
                            },
                            {
                                // 将index.html 将 bundle.js 进行一个区分|分割  ,不会融入到一体
                                // 因为我们之前加载css和html都会加载到 bundle.js 里去只出口一个文件
                                loader:"extract-loader"
                            },
                            {
                                // 可以理解为此处三个Loader的领导
                                // 它有自己的流程 , 它会帮你找到html 文件,
                                // 它会借助你的extract-loader 跟bundle.js 进行分离
                                // 借助 file-loader 对文件进行一个起名
                                loader:"html-loader",
                                // 处理静态页时搜索其使用的图片
                                options:{
                                    // 属性 意为 img 标签里的 src 属性
                                    attrs:["img:src"]
                                }
                            }
                    ]
                },
                // images loader 处理图片
                {
                    test:/\.(jpg|png|gif|jpeg)$/,
                    use:[
                        {
                            // 还是使用file-loader
                            loader:"file-loader",
                            // 取名
                            options:{
                                // [name] 原本的名字是啥就是啥, [ext]原本的后缀是啥就是啥
                                // [hash:8] 8位的哈希值
                                name:"images/[name]-[hash:8].[ext]"
                            }
                        }
                    ]
                }
        ]
    }
    
}