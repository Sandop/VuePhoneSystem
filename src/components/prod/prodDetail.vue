<template>
    <div class="container">
        <nav-bar title="商品详情"></nav-bar>
        <div class="swiper-wrap">
            <div class="swiper">
                <my-swiper :imgs="imgs"></my-swiper>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li>
                    <span class="product-desc-span">{{prodInfo.proName}}</span>
                </li>
                <li class="price-li">市场价：
                    <s>￥{{prodInfo.proPrice}}</s> 销售价：<span>￥{{prodInfo.proPrice}}</span>
                </li>
                <li class="number-li">
                    购买数量：<span @click="reduce">-</span><span>{{num}}</span><span @click="add">+</span>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopCart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition  name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{modleCode.modelCodeName}}</li>
                <li>库存情况：{{prodInfo.proId}}件</li>
                <li>上架时间：{{prodInfo.proUpdateTime | converData}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="routerPicInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="routerComInfo">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import connect from "../common/connect.js";
    import prodTools from "../common/prodTools.js";

    export default {
        data (){
            return {
                id: this.$route.params.id,
                imgs: [],    //轮播图图片信息
                prodInfo: {},   //产品详情
                modleCode: {},   //产品货号
                num: 1,         //购物车数量
                isShow: false   //小球是否显示
            }
        },
        created (){
            // let id = this.$route.params.id;
            this.$axios.get(`/product/detail/${this.id}`)
            .then( res => {
                // console.log(res);
                //产品信息
                this.prodInfo = res.data;
                //商品货号
                this.modleCode = res.data.modleCode;
                //将产品的图片地址转换为与banner图片的地址一致，即在产品图片中加入了bannerSrc与bannerAlt，使得轮播组件复用
                this.imgs = res.data.proImgs;
                this.imgs.map( (cur,index) => {
                    this.imgs[index].bannerSrc = cur.proImgSrc;
                    this.imgs[index].bannerAlt = cur.proImgAlt;
                })
            }).catch( err => {
                console.log(err);
            })
        },
        methods: {
            routerPicInfo (){
                let id = this.id;
                this.$router.push({
                    name: 'prod.info',
                    params: {id}
                })
            },
            routerComInfo (){
                let id = this.id;
                this.$router.push({
                    name: 'prod.commont',
                    params: {id}
                })
            },
            //商品数量减少
            reduce (){
                if ( this.num <=1 ) return;
                this.num --
            },
            //商品数量增加
            add (){
                if (this.num >= this.prodInfo.proId) return;
                this.num ++
            },
            //添加到购物车功能
            addShopCart (){
                // console.log('发送！')
                //购物车数量发送
                connect.$emit('addShopCart',this.num);
                this.isShow = true;

                //添加产品
                prodTools.addOrUpdata({
                    id: this.id,
                    num: this.num
                })
            },
            //transition的钩子函数，处理过渡动画进入后的效果
            afterEnter (){
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>
    /* 添加购物车小球飞入动画 */
    .ball-enter-active {
        animation: bounce-in .5s;
    }

    @keyframes bounce-in {
        0% {
            transform: translate3d(0,0,0);
        }
        5% {
            transform: translate3d(5px,-15px,0);
        }
        10% {
            transform: translate3d(13px,-25px,0);
        }
        15% {
            transform: translate3d(30px,-31px,0);
        }
        25% {
            transform: translate3d(55px,-26px,0);
        }
        50% {
            transform: translate3d(77px,-8px,0);
        }
        75% {
            transform: translate3d(100px, 130px, 0);
        }
        100% {
            transform: translate3d(110px, 300px, 0);
        }
    }

    .swiper-wrap {
        overflow:  hidden;
        width:  100%;
        margin: 55px 0 0;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-sizing:  border-box;
    }

    .swiper {
        overflow:  hidden;
        width: 95%;
        margin: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 15px;
    }   

    .product-desc,
    .product-props,
    .product-info {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 3px;
    }

    .product-desc ul li,
    .product-props ul li,
    .product-info ul li {
        list-style: none;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 8px;
    }

    .product-desc ul >:nth-child(1) span {
        color: blue;
        font-size: 22px;
        font-weight: bold;
    }

    .product-desc ul >:nth-child(1) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }

    .product-desc ul,
    .product-info ul,
    .product-props ul {
        padding-left: 10px;
    }

    .price-li span {
        color: red;
        font-size: 25px;
    }

    .price-li s {
        margin-right: 16px;
    }

    /*加减*/

    .number-li span {
        display: inline-block;
        border: 2px solid rgba(0, 0, 0, 0.1);
        width: 25px;
    }


    /*商品参数*/

    .product-props ul >:nth-child(1) {
        text-align: left;
    }

    .product-props ul:not(:nth-child(1)) {
        margin-left: 40px;
    }

    .product-info ul {
        margin-bottom: 70px;
        padding: 0 5;
    }

    .number-li span {
        text-align: center;
    }

    .number-li >:nth-child(2) {
        width: 40px;
    }

    .ball {
        position: absolute;
        top: 440px;
        left: 120px;
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: red;
        z-index: 9999;
    }
</style>
 