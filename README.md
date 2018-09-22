## 项目介绍
    这是一个使用Vue做的移动端的项目，其中使用了Mint UI 、Moment 、MUI等完成,页面效果比较丑但是还是适合新手练习vue使用哒O(∩_∩)O~。
    页面有新闻页面，图文分享页面，商品页面，购物车等基本页面，
    包含功能有使用mintUi实现 列表页面图片懒加载 、 轮播图 、 页面间跳转显示加载中动画 、
    列表上拉加载更多 、 商品详情图片点击放大效果 、 购物车小球飞入效果 、 购物车增加减少添加删除等功能！
    希望对大家有所帮助 (*@ο@*) 哇～

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

$ npm run dev

$ npm run build

```

## 一、项目开始

### 1、创建项目

>第一步 创建目录文件`VuePhoneSystem` ;

>第二步 `npm init -y` 创建package.json文件;

>第三步 安装相关依赖 
`npm i mint-ui vue-preview axios vue-router moment vue - S`,
`npm i webpack html-webpack-plugin css-loader style-loader less less-loader autoprefixer-loader babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime url-loader file-loader vue-loader vue-template-compiler webpack-dev-server - D`;

>第四步 创建 `src` 目录，并在其中创建 `index.html`, `main.js`, `app.vue`;

>第五步 配置`webpack.config.js`相关文件;

>第六步 启动文件，看到相关信息，OK！项目的前期准备工作就完成了。


### 2、页面布局

```
.
├── dist                                         // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── mySwiper.vue                    // 轮播图封装
│   │   │   ├── navBar.vue                      // 头部导航
│   │   │   ├── connect.js                      // 父子组件通信连接
│   │   │   └── prodTools.js                    // localstor操作工具
│   │   ├── home
│   │   │   └── home.vue                        // 首页
│   │   └── member
│   │       └── member.vue                      // 会员页面（暂时未写）
│   │   ├── news
│   │   │   └── newsDetails.vue                 // 新闻详情页面
│   │   │   └── newsList.vue                    // 新闻列表页面
│   │   ├── photo
│   │   │   └── share.vue                       // 图文分享列表
│   │   ├── prod
│   │   │   └── prodCommont.vue                 // 商品评论页面
│   │   │   └── prodDetail.vue                  // 商品详情页面
│   │   │   └── prodInfo.vue                    // 商品信息页面
│   │   │   └── prodList.vue                    // 商品列表页面
│   │   ├── search
│   │   │   └── search.vue                      // 搜索页面（暂时未写）
│   │   ├── shopcart
│   │   │   └── shopcart.vue                    // 购物车页面
│   ├── static                                  // 静态资源文件
│   │   ├── css                                 // 全局css
│   │   ├── img                                 // 页面所需图片
│   │   ├── vender                              // 引入MUI所需
│   ├── App.vue                                 // 页面入口文件
│   ├── index.html                              // 入口html文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── .gitignore                                  // git上传忽略文件
├── package.json                                // 安装依赖
├── webpack.config.js                           // webpack配置文件


```

### 3、项目截图

#### 1、首页

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/home.png"  width="365" height="619"/>


#### 2、新闻列表

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/news-list.png"  width="365" height="619"/>

> 实现上拉加载更多

#### 3、图文分享

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/share.png"  width="365" height="619"/>

> 列表切换，图片懒加载，上拉加载更多

#### 4、购物车

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/shopcart.png"  width="365" height="619"/>

> 商品添加、减少、删除、选中价格数量计算功能

#### 5、商品列表

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/prodlist.png"  width="365" height="619"/>

> 图片懒加载，上拉加载更多

#### 6、商品详情

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/prod-details.png"  width="365" height="619"/>

> 商品添加、减少功能

#### 7、商品图文

<img src="https://github.com/Sandop/VuePhoneSystem/blob/master/screenshots/prod-img.png"  width="365" height="619"/>

> 点击图片放大查看效果


## 二、写在最后

> 此项目适合刚接触vue的同学联系使用，如果对大家有帮助，欢迎给个star，O(∩_∩)O谢谢！