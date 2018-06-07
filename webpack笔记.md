# webpack 的安装与使用

>  环境依赖 
>
> npm install  webpack   -g
>
> npm install  webpack-cli   -g
>
> npm install webpack-dev-server  -g

## 目录结构

### 无 webpack.dev.js 文件配置下默认结构要求

* project
   * dist
      * index.html		
   * src
      * index.js ( 如果没有经过配置 , 那么默认入口寻找 index.js )        
   * config
      * webpack.dev.js     
   * .babelrc  文件
   



## webpack 命令

### 未配置前

* webpack4 中独有的命令

* 没有 webpack.dev.js 也可以使用的命令

* 执行后会在 dist 中生成一个 main.js 的文件

* 分为两种环境
  | 命令 | 环境 |文件大小 ( 相对 )|
  | :--: | :--: | :--: |
  |   webapck  --mode=development   | 开发 | 2.81kb|
  |webpack  --mode=production|生产|545 bytes|

### 配置后

> webpack  --config=config/webpack.dev.js



## webpack.dev.js 的作用

* 加载一些你需要的 css 或 图片之类的静态文件

## 配置 webpack.dev.js 

### webpack 属性及用法详解

> =>  表示属于上方的内部属性

| Key   | 作用         | 用法 | 特殊情况 |
| ----- | ------------ | ---- | -------- |
| entry | 填写入口文件 | { main: "./src/main.js"} | 多个入口文件就以数组形式: ["main.js","other.js"] |
|mode|填写打包环境(开发/生产)|开发: development   生产: production||
|output|填写出口文件|{ : "bundle.js", path:path.resolve(__dirname,"../dist", publicPath:"/"  )}|动态文件名:  "[name]-bundle.js"|
|=> publicPath| 填写静态页引用文件的公开的路径 |'/js'   静态页:  '/js/index.js'||
|devServer|配置本地服务器|devServer:{  contentBase:"dist"  , overlay :true    }||
|=> contentBase|设置服务器根路径为 dist 文件夹|此时比如打开 localhost:8080 就是在dist 下||
|=> overlay|设置是否在页面上显示保存信息|打开时报错信息就会出现在页面上||
|module|配置html/css/img等文件读取规则|rules:[], 太多了这里写不下,看下面的||
|=>rules|设置查找规则  rules 在webpack4之前的版本是loaders ,存放的是一个数组|rules:[ {test:/\.css/,use:[{ loader:"style-loader"},{loader:"css-loader"}]}]||
|==>test|使用正则匹配文件后缀|如匹配css     /\\.css/||
|==> use|找到文件后对它进行加载的操作|存放的是一个数组,放的是负责操作的模块名, 如: [{loader:"style-loader" },{loader:"css-loader"}]||



## webpack-dev-server热启动

> 启动命令 webpack-dev-server  --config=config/webpack.dev.js

* 更改非配置文件会自动刷新页面
* 更改配置文件需要重新执行命令, 它会自动重新打包

## css 加载器 
> npm install style-loader  --save
> npm install css-loader  --save

* 负责处理 rules 中匹配到的 css  文件
* style-loader 就负责是把css写入html里去 
* css-loader 就是把css样式放到 main-bunld.js  里去

## HTML 加载器

> npm install html-loader  --save
>
> npm install extract-loader  --save
>
> npm install file-loader  --save



## img 加载器
> npm install file-loader  --save

## .babelrc 配置
> npm  install  babel-loader  babel-core
> npm  install  -g   babel-cli
> 将箭头函数 转为 function 
> npm install  babel-plugin-transform-es2015-arrow-functions
> async 函数转换为promise
> npm install babel-plugin-async-to-promises

> babel  单独运行命令示例  
>  babel  src/main.js
```babel
{
//配置我们下载的插件
    "plugins":[
        "transform-es2015-arrow-functions",
        "async-to-promises"
    ]
}
```
##  polyfill  / transform转换 
> npm install babel-polyfill
> 

* 全部使用 polyfill    只需要在入口文件处引用 =》 main: [ " babel-polyfill "," ./src/main.js " ]
* 局部使用，比如只用转换  箭头函数或者 只转换 async
##  preset 配置环境变量
> 安装 preset
> npm  install babel-preset-env 
> 解决 promise 打包之后对全局变量的污染
> npm install babel-plugin-transform-runtime  并且使用时还需要再main.js 最顶部引入 require("babel-runtime/regenerator")
> 需要重新配置 babel 结构
> 配置好babel 后 执行 npm start
> 他会给我们下载很多很多的 es2015 你所需要的转换插件
```babel
{
    "presets": [
        [
            "env",
            {
            	 "targets":{
            	// 这里配置浏览器支持的版本 
                    "browsers":["last 2 versions"] 
                },
                "debug":true
            }
        ]
    ],
    "plugins": [
    	//解决 promise 打包之后对全局变量的污染
        "transform-runtime"
    ]
}
```




## 自定义启动命令
* 将 package.json 文件中的 "scripts" 里的内容修改为 自己想要的命令 , 以简短的命令代替了复杂的启动命令

* 如下

  ![1528335058983](C:\Users\Lei\AppData\Local\Temp\1528335058983.png)
  
  