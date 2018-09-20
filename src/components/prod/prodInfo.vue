<template>
    <div class="container">
        <nav-bar title="商品图文"></nav-bar>
        <div class="prod-info-wrap">
            <div class="products-view-title">
                <h1>{{prodInfo.proName}}</h1>
            </div>
            <div class="products-parameter">
                <div class="products-parameter-word">产品参数：</div>
                <div class="products-par-details-box">
                    <p v-for="(value,key,index) in prodInfo.param" :key="index">{{key}}：{{value}}</p>
                </div>
            </div>
            <div class="info-img-wrap">
                <ul class="info-img-box">
                    <li v-for="(img,index) in imgs"  :key="index"  class="info-img">
                        <img v-preview="img.proImgSrc" :src="img.proImgSrc" :alt="img.proImgAlt" :key="index" preview-title-enable="true" preview-nav-enable="true">
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
                id: this.$route.params.id,
                imgs: [],
                prodInfo: {}
            }
        },
        created (){
            this.$axios.get(`/product/detail/${this.id}`)
            .then( res => {
                console.log(res)
                //产品信息
                this.prodInfo = res.data;
                this.imgs = res.data.proImgs;
                
            }).catch( err => {
                console.log(err);
            })
        },
        methods:{
        }
    }
</script>

<style scoped>
    .prod-info-wrap {
        margin-top: 55px;
        background: #eee;
    }

    .products-view-title {
        width:  100%;
        height:  40px;
        text-align:  center;
    }

    .products-view-title h1 {
        line-height: 40px;
    }

    .products-parameter {
        width:  100%;
        padding-top: 10px;
    }

    .products-par-details-box {
        overflow:  hidden;
        width: 100%;
        padding: 10px 10px;
    }

    .products-par-details-box p {
        float:  left;
        width:  50%;
    }

    .products-parameter-word {
        padding-left: 10px;
    }

    .info-img-wrap {
        overflow:  hidden;
        width: 100%;
        background: #eee;
    }

    ul.info-img-box {
        width: 100%;
    }

    li.info-img {
        overflow:  hidden;
        width:  100%;
        height: 300px;
        margin: 5px 0;
        border: 1px solid #26a2ff;
    }

    li.info-img img {
        width: 100%;
    }
</style>
