---
title: VantUi Demo
name: vant-ui-demo
---
<script setup>
import {storeToRefs} from 'pinia'
import {useAppStore} from '~/stores/useAppStore'
const {darkMode,language} = storeToRefs(useAppStore())

</script>
<VantProvider :dark="darkMode" :locale="language">
  <div class="p-3 bg-white rounded-md flex flex-wrap gap-3 dark:(bg-black!)" >
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</VantProvider>
