<template>
    <div class="container">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(prod,index) in allProdsInfo" :key="prod.proId"  class="p-list">
                    <mt-switch v-model="prod.isPicked"></mt-switch>
                    <img :src="prod.proImgs[0].proImgSrc">
                    <div class="pay-calc">
                        <p v-text="prod.proName"></p>
                        <div class="calc">
                            <span>￥{{prod.proPrice}}</span>
                            <span>-</span>
                            <span >{{index}}</span>
                            <span>+</span>
                            <a href="javascript:;">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div> -->
    </div>
</template>

<script>
    import connect from '../common/connect.js'
    import prodTools from '../common/prodTools.js' 

    export default {
        data (){
            return {
                allProdsInfo: []        //获取所有商品ID，以数组方式存储
            }
        },
        created (){
            //localstorage 中商品信息
            let prods = prodTools.getProds();
            console.log(prods);


            //获取所有商品ID，以数组方式存储
            let prodsArray = Object.keys(prods);
            console.log(prodsArray);
            //若商品无，则返回
            if ( !prodsArray.length ) return;

            prodsArray.map( (cur,index) => {
                this.$axios.get(`/product/detail/${cur}`)
                .then( res => {
                    this.allProdsInfo[index] = res.data;
                }).catch ( err => {
                    console.log(err);
                })
            })

            console.log(this.allProdsInfo);
        },
        methods: {

        }
    }
</script>

<style scoped>
    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul li >:nth-child(1),
    .pay-detail ul li >:nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul li >:nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        display: inline-block;
        width: 20px;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1,
    .show-2 {
        display: inline-block;
    }

    .show-1,
    .show-2 {
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
