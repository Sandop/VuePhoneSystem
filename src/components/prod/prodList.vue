<template>
    <div class="container">
        <nav-bar title="商品列表"></nav-bar>
        <!-- 产品列表上拉加载更多效果，使用mintUi插件mt-loadmore实现，上拉完毕需要调用onBottomLoaded函数告知上拉完毕 -->
        <div class="prod-wrap">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
                <ul class="mui-table-view mui-grid-view">
                    <li v-for="prod in prods" :key="prod.proId" class="mui-table-view-cell mui-media mui-col-xs-6">
                        <router-link :to="{name:'prod.detail',query:{id:prod.proId} }">
                            <!-- v-lazy使用的 mintUi的插件实现产品图片的懒加载 -->
                            <img class="mui-media-object" v-lazy="prod.proImgs[0].proImgSrc" :alt="prod.proImgs[0].proImgAlt">
                            <div class="mui-media-body">{{prod.proName}}</div>
                            <div class="desc">
                                <div class="sell">
                                    <span>￥{{prod.proPrice}}</span>
                                    <s>￥{{prod.proPrice}}</s>
                                </div>
                                <div class="detail">
                                    <div class="hot">
                                        热卖中
                                    </div>
                                    <div class="count">
                                        剩{{prod.proStyleId}}件
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                pageIndex: 1,   //页码数
                prods: [],      //商品列表数据
                allLoaded:false, //是否禁止触发上拉函数
                isAutoFill:false,//是否自动触发上拉函数

                //产品列表数据请求为post的参数
                dataJson: {
					positionId: 1,              //产品的类别
					typeId : null,	            //产品的子类别
					textureId : null,	        //产品的材质
					seriesId : null,	        //产品的系列
					styleId : null,		        //产品的分格
					orderByTime: 0,             //是否按时间排序
					orderByPageViewsCount: 0,   //是否按最新产品排序
					orderByPrice: 0             //是否按价格排序
                }
            }
        },
        
        created (){
            this.$axios.post('/product/selectByCondition/1/8',this.dataJson)
            .then( res => {
                // console.log(res);
                this.prods = res.data.list;
            }).catch( err => {
                console.log(err);
            });
        },
        methods: {
            loadBottom(){
                // console.log('开始上拉！')
                //上拉调用加载更多函数
                this.loadMoreCon();
            },
            loadMoreCon (){
                this.$axios.post(`/product/selectByCondition/${++ this.pageIndex}/8`,this.dataJson)
                .then( res => {
                    this.prods = this.prods.concat(res.data.list);
                    console.log(this.prods);
                    //判断是否还有数据
                    if (this.prods.length >= res.data.total) {
                        this.allLoaded = true;//禁止调用上拉函数了
                    }
                    //上拉结束通知结束停止
                    this.$refs.loadmore.onBottomLoaded();
                }).catch( err => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    .prod-wrap {
        overflow: auto;
        height:577px;
        -webkit-overflow-scrolling: touch;
        /* 这个高度设置,overflow:auto/scroll可以使上拉的时候加载内容 ,针对ios加个-webkit-overflow-scrolling: touch的属性*/
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
        margin: 0px;
        padding: 0px;
        border: 1px solid #5c5c5c;
        box-shadow: 0 0 4px #666;
    }

    .sell > span {
        float: left;
        color: red;
        text-align: left;
    }

    .detail >.hot {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .detail >.count {
        float: right;
        text-align: right;
        font-size: 15px;
    }


    /*撑开，去除浮动没有的高度*/

    .detail {
        overflow: hidden;
    }

    .desc {
        color: rgba(92, 92, 92, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
        height: 200px;
    }
</style>
