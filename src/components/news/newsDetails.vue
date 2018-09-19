<template>
    <div class="container">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p v-text="newsDetails.articleName"></p>
            <div class="news-tab">
                <span>作者:{{articleEditor.articleEditorName}}</span>
                <span>分类:{{articleCategory.articleCategoryName}}</span>
                <span>添加时间:{{newsDetails.articleUpdateTime | converData}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetails.articleText"></div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                newsDetails : {},
                articleEditor : {},
                articleCategory : {},
                title: ''
            }
        },
        created (){
            let id = this.$route.params.id;
            this.$axios.get(`/article/getArticleDetails/${id}`)
            .then( res => {
                this.newsDetails = res.data;
                this.articleEditor = res.data.articleEditor;
                this.articleCategory = res.data.articleCategory;
            })
        },
        beforeRouteEnter (to,from,next){
            let myTitle = '';
            if ( from.name === 'news.list' ) {
                myTitle = '新闻详情';
            } else if ( from.name === 'photo.share' ) {
                myTitle = '图文详情'
            }
             next(vm => {
                 vm.title = myTitle;
             })
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
    }
    .news-title p {
        color: #0a87f8;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    .news-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .news-tab span {
        font-size: 14px;
        color: #8f8f94;
    }

    .news-title {
        margin-top: 60px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }


    /*主体文章的左右距离*/

    .container .news-content {
        overflow: hidden;
        width: 100%;
        padding: 10px 5px;
    }

    .container .news-content p {
        display: block;
        width: 100%;
    }

    .container .news-content p img{
        display: block;
        width: 100%;
    }
</style>
