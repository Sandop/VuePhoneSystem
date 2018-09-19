<template>
    <div class="container">
        <nav-bar title="图文分享"></nav-bar>
        <div class="share_wrap">
            <div class="photo-header">
                <ul>
                    <li v-for="category in categorys" :key="category.articleCategoryId">
                        <a href="javascript:;" @click="changeCate(category.articleCategoryId)">{{category.articleCategoryName}}</a>
                    </li>
                </ul>
            </div>
            <div class="photo-list">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
                    <ul>
                        <li v-for="list in shareData" :key="list.articleId">
                            <router-link :to="{ name:'share.detailes',params: {id:list.articleId} }">
                                <!-- <img :src="img.img_url"> -->
                                <!-- 懒加载实现，使用mintUI插件中v-lazy属性，请求可视区域内容 -->
                                <img v-lazy="list.articleImg.articleImgSrc" :alt="list.articleImg.articleImgAlt">
                                <p>
                                    <span v-text="list.articleName"></span>
                                    <br>
                                    <span v-text="list.articleText"></span>
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                categorys: [],
                shareData: [],
                id: 1,
                pageIndex: 1,   //页码数
                allLoaded:false, //是否禁止触发上拉函数
                isAutoFill:false //是否自动触发上拉函数
            }
        },
        created (){
            //请求列表头部内容
            this.$axios.get(`/articleCategory/getAll`)
                .then(res => {

                    this.categorys = res.data;
                })
                .catch(err => {
                    console.log(err);
                });

                this.changeCate (this.id);
            
        },
        methods: {
            //请求函数封装
            changeCate (id){
                this.id = id;
                this.$axios.get(`/article/getArticles/${id}/1/8`)
                .then(res => {
                    // console.log(res.data.total);

                    this.shareData = res.data.list;
                })
                .catch(err => {
                    console.log(err);
                });
            },
            loadBottom(){
                console.log('开始上拉！')
                //上拉调用加载更多函数
                this.loadMoreCon();
            },
            loadMoreCon (){
                this.$axios.get(`/article/getArticles/${this.id}/${++this.pageIndex}/8`)
                .then( res => {
                    this.shareData = this.shareData.concat(res.data.list);
                    // console.log(this.shareData);
                    // console.log(this.shareData.length);
                    // console.log(res.data.total);

                    //判断是否还有数据
                    if (this.shareData.length >= res.data.total) {
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
    .share_wrap {
        margin-top: 60px;
    }
    .photo-list {
        overflow: auto;
        height:527px;
        -webkit-overflow-scrolling: touch;
        /* 这个高度设置,overflow:auto/scroll可以使上拉的时候加载内容 ,针对ios加个-webkit-overflow-scrolling: touch的属性*/
    }

    .photo-header li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }

    .photo-header ul {
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0px;
        margin: 5;
    }


    /*下面的图片*/

    .photo-list li {
        list-style: none;
        position: relative;
        width: 100%;
    }

    .photo-list li a{
        display: block;
        width: 100%;
    }
    

    .photo-list li img {
        width: 100%;
        height: 230px;
        vertical-align: top;
    }

    .photo-list ul {
        padding-left: 0px;
        margin: 0;
    }

    .photo-list p {
        position: absolute;
        bottom: 0px;
        width: 100%;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0px;
    }

    .photo-list p span:nth-child(1) {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 30px;
        font-weight: bold;
        font-size: 16px;
        line-height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .photo-list p span:nth-last-child(1) {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 72px;
        font-size: 14px;
        line-height: 24px;
    }

    /*图片懒加载的样式*/
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>
