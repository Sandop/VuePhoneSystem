<template>
    <div class="container">
        <nav-bar title="图片分享"></nav-bar>
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
                        <a>
                            <!-- <img :src="img.img_url"> -->
                            <!-- 懒加载 -->
                            <img v-lazy="list.articleImg.articleImgSrc" :alt="list.articleImg.articleImgAlt">
                            <p>
                                <span v-text="list.articleName"></span>
                                <br>
                                <span v-text="list.articleText"></span>
                            </p>
                        </a>
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
            this.$axios.get(`/articleCategory/getAll`)
                .then(res => {
                    console.log(res);
                    this.categorys = res.data;
                    // this.categorys.unshift({
                    //     articleCategoryId: 0,
                    //     articleCategoryName:'全部',
                    //     description: '',
                    //     keyword: '',
                    //     title: ''
                    // });
                    console.log(this.categorys)
                })
                .catch(err => {
                    console.log(err);
                });

                this.changeCate (1);
            
        },
        methods: {
            changeCate (id){
                this.$axios.get(`/article/getArticles/${id}/1/8`)
                .then(res => {
                    console.log(res);
                    this.shareData = res.data.list;
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style>
    .share_wrap {
        margin-top: 60px;
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
