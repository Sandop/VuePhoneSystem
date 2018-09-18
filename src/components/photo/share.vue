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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                categorys: [],
                shareData: []
            }
        },
        created (){
            //请求列表头部内容
            this.$axios.get(`/articleCategory/getAll`)
                .then(res => {
                    this.categorys = res.data;
                    // this.categorys.unshift({
                    //     articleCategoryId: 0,
                    //     articleCategoryName:'全部',
                    //     description: '',
                    //     keyword: '',
                    //     title: ''
                    // });
                })
                .catch(err => {
                    console.log(err);
                });

                this.changeCate (1);
            
        },
        methods: {
            //请求函数封装
            changeCate (id){
                this.$axios.get(`/article/getArticles/${id}/1/8`)
                .then(res => {
                    this.shareData = res.data.list;
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .photo-list {
        margin-top: 21px;
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
