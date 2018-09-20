<template>
    <div>
        <mt-header fixed title="来买吧"></mt-header>

        <transition name="router" mode="out-in">
            <router-view></router-view>
        </transition>
        <lg-preview></lg-preview>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon icon-shouye1"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon icon-diamond"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon icon-gouwucheman"><span class="mui-badge">{{carNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import connect from "./components/common/connect.js";
    import prodTools from "./components/common/prodTools.js";

    export default {
        data (){
            return {
                carNum: prodTools.getTotalNum()       //购物车显示数量,通过prodTools从localstorage中获取
            }
        },
        created (){
            //接受详情传输商品数量
            connect.$on( 'addShopCart', num =>{
                // console.log('接受！');
                this.carNum += num;
            })
        }
    }
</script>

<style>
.mint-header.is-fixed {
    z-index: 666;
}
.router-enter-active,.router-leave-active {
    transition: opacity .5s;
}
.router-enter, .router-leave-to {
    opacity: 0;
}
</style>
