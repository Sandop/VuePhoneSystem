<template>
    <div class="container">
        <nav-bar title='新闻列表'></nav-bar>
        <div class="news-list">
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
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                newsList: []
            }
        },
        created (){
            this.$axios.get('http://visney.cn:81/article/getArticles/1/1/8')
            .then(res => {
                this.newsList = res.data.list;
            })
        }
    }
</script>

<style scoped>
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
