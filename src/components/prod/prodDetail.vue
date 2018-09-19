<template>
    <div class="container">
        <nav-bar title="商品详情"></nav-bar>
        <div class="swiper-wrap">
            <div class="swiper">
                <my-swiper :imgs="imgs"></my-swiper>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                imgs: []
            }
        },
        created (){
            let id = this.$route.params.id;
            this.$axios.get(`/product/detail/${id}`)
            .then( res => {
                console.log(res);

                //将产品的图片地址转换为与banner图片的地址一致，即在产品图片中加入了bannerSrc与bannerAlt，使得轮播组件复用
                this.imgs = res.data.proImgs;
                this.imgs.map( (cur,index) => {
                    this.imgs[index].bannerSrc = cur.proImgSrc;
                    this.imgs[index].bannerAlt = cur.proImgAlt;
                })
                console.log(this.imgs);


            }).catch( err => {
                console.log(err);
            })
        },
        methods: {

        }
    }
</script>

<style scoped>
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

</style>
 