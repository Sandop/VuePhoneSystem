<template>
    <div class="container">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <div>
                <ul>
                    <li v-for="(prod,index) in allProdsInfo" :key="prod.proId"  class="p-list">
                        <mt-switch v-model="prod.isPicked"></mt-switch>
                        <img :src="prod.proImgs[0].proImgSrc">
                        <div class="pay-calc">
                            <p v-text="prod.proName"></p>
                            <div class="calc">
                                <span>￥{{prod.proPrice}}</span>
                                <span @click="reduce(index)">-</span>
                                <span >{{prod.num}}</span>
                                <span @click="add(index)">+</span>
                                <a href="javascript:;" @click="del(index)">删除</a>
                            </div> 
                        </div>
                    </li>
                </ul>
            </div>
            <div class="pay-info" v-if="!allProdsInfo.length">还没有产品，去其他地方逛逛吧~</div>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{0}}件，总价￥{{0}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
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
                console.log(cur,index)
                this.$axios.get(`/product/detail/${cur}`)
                .then( res => {
                    //将控制开关和商品数量添加到商品信息中
                    res.data.isPicked = true;
                    res.data.num = prods[cur];
                    this.allProdsInfo.push(res.data);

                }).catch ( err => {
                    console.log(err);
                })
            })

            console.log(this.allProdsInfo);

        },
        methods: {
            reduce (i){
                if (this.allProdsInfo[i].num <= 1) return;
                this.allProdsInfo[i].num --;
                //改变购物车数量
                connect.$emit('addShopCart',-1);
                //在localstorage中添加
                prodTools.addOrUpdata({
                    id:  this.allProdsInfo[i].proId,
                    num: -1
                })
            },
            add (i){
                this.allProdsInfo[i].num ++;
                //改变购物车数量
                connect.$emit('addShopCart',1);
                //在localstorage中添加
                prodTools.addOrUpdata({
                    id:  this.allProdsInfo[i].proId,
                    num: 1
                })
            },
            del (i){
                
                //删除localst中数据
                prodTools.delete(this.allProdsInfo[i].proId);
                //购物车数量变化
                connect.$emit('addShopCart',-this.allProdsInfo[i].num);
                //删除列表中数据
                this.allProdsInfo.splice(i,1);
            }
        }
    }
</script>

<style scoped>
    .pay-info {
        color: #cccccc;
        font-size: 18px;
        line-height: 80px;
        text-align: center;
    }
    .pay-detail {
        min-height: 30px;
        margin-top: 55px;
    }

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
        padding: 30px 0;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
