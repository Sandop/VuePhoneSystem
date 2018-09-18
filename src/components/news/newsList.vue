<template>
    <div class="container">
        <nav-bar title='新闻列表'></nav-bar>
        <div class="news-list">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell mui-media" v-for="list in newsList" :key="list.articleId">
                        <router-link class="mui-navigate-right" :to="{name: 'news.details', params: {id: list.articleId}}">
                            <img class="mui-media-object mui-pull-left" v-lazy="list.articleImg.articleImgSrc" :alt="list.articleImg.articleImgAlt">
                            <div class="mui-media-body">
                                <span>{{list.articleName}}</span>
                                <div class="news-desc">
                                    <p>点击数: 22</p>
                                    <p>发表时间:{{list.articleAddTime | converData}}</p>
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
                newsList: [],
                allLoaded:false, //是否禁止触发上拉函数
                isAutoFill:false,//是否自动触发上拉函数
                pageIndex: 1,   //页码数

            }
        },
        created (){
            this.$axios.get(`/article/getArticles/1/${this.pageIndex}/8`)
            .then(res => {
                this.newsList = res.data.list;
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
            loadBottom(){
                // console.log('开始上拉！')
                //上拉调用加载更多函数
                this.loadMoreCon();
            },
            loadMoreCon (){
                this.$axios.get(`/article/getArticles/1/${ ++this.pageIndex }/8`)
                .then( res => {
                    this.newsList = this.newsList.concat(res.data.list);
                    // console.log(this.newsList);
                    // console.log(this.newsList.length);
                    // console.log(res.data.total);
                    //判断是否还有数据
                    if (this.newsList.length >= res.data.total) {
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
    .news-list {
        overflow: auto;
        height:527px;
        -webkit-overflow-scrolling: touch;
        /* 这个高度设置,overflow:auto/scroll可以使上拉的时候加载内容 ,针对ios加个-webkit-overflow-scrolling: touch的属性*/
        margin-top: 54px;
    }

    .mui-media-body p {
        color: #0bb0f5;
    }

    .news-desc p:nth-child(1) {
        float: left;
    }

    .news-desc p:nth-child(2) {
        float: right;
    }

    .mui-media-body span {
        display: block;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
