<template>
    <div class="container">
        <nav-bar title="新闻详情"></nav-bar>
        <div class="news-title">
            <p v-text="newsDetails.articleMetaTitle"></p>
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

            }
        },
        created (){
            let id = this.$route.query.id;
            this.$axios.get(`http://visney.cn:81/article/getArticleDetails/${id}`)
            .then( res => {
                this.newsDetails = res.data;
                this.articleEditor = res.data.articleEditor;
                this.articleCategory = res.data.articleCategory;
            })
        }
    }
</script>

<style scoped>
    .news-title p {
        margin-top: 60px;
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
        margin-top: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }


    /*主体文章的左右距离*/

    .news-content {
        width: 100%;
        padding: 10px 5px;
    }

    .news-content p {
        width: 100%;
    }

    .news-content p img{
        width: 100%;
    }
</style>
