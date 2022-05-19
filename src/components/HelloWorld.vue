<script setup lang='ts'>
import http from '@/http';
const get = function(i){ 
    http.get(`/tesc`).then(res=>{
        console.log(res);
        
    }).catch(res=>{
        console.log(res);
        
    })
}
</script>
<template>
    <div>
        <h1>hello world</h1>
        <button @click="get(1)">GET1</button>
        <button @click="get(2)">GET2</button>
    </div>
</template>
<style scoped lang='less'>

</style>