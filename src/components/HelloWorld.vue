<script setup lang='ts'>
import http from '@/http';

const get = function(){
    http.get('/').then(res=>{
        console.log(res);
        
    })
}
</script>
<template>
    <div>
        <h1>hello world</h1>
        <button @click="get">GET</button>
    </div>
</template>
<style scoped lang='less'>

</style>