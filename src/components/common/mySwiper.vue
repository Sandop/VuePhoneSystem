<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(list,index) in imgs" :key="index">
                <a :href="list.href" :rel="list.ref">
                    <img :src="list.bannerSrc" :alt="list.bannerAlt">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        data (){
            return {
            }
        },
        props: ['imgs'],
    }
</script>

<style scoped>
        .mint-swipe{
            height: 187px;
            max-height:187px; 
        }
        .mint-swipe img {
            width: 100%;
            height: 100%;
        }
</style>
