'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Axios from 'axios';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
import './static/vender/mui/dist/css/mui.css';
import './static/css/reset.css';

import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import Search from './components/search/search.vue';
import NewsList from './components/news/newsList.vue';
import NewsDetails from './components/news/newsdetails.vue';
import NavBar from './components/common/navBar.vue';
import PhotoShare from './components/photo/share.vue';

import Moment from 'moment';

Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'http://visney.cn:81';

Axios.interceptors.request.use( function (config) {
    MintUI.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });

    return config;
});

Axios.interceptors.response.use( function (config){
    MintUI.Indicator.close();
    return config;

});


Vue.component('navBar',NavBar);

Vue.filter('converData',function(value){
    return Moment(value).format('YYYY-MM-DD');
})

let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes: [
        //VueRouter：配置路由规则
        { 
            path: '/',
            redirect: { 
                name: 'home' 
            } 
        }, //重定向
        {   
            name: 'home',
            path: '/home',
            component: Home
        },
        {   
            name: 'member',
            path: '/member',
            component: Member
        },
        {   
            name: 'search',
            path: '/search',
            component: Search
        },
        {   
            name: 'shopcart',
            path: '/shopcart',
            component: Shopcart
        },
        {   
            name: 'news.list',
            path: '/news/list',
            component: NewsList
        },
        {   
            name: 'news.details',
            path: '/news/details',
            component: NewsDetails
        },
        {   
            name: 'photo.share',
            path: '/photo/share',
            component: PhotoShare
        },
    ]
});

//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})