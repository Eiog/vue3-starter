---
title: NutUi Demo
name: nut-ui-demo
---
<script setup>
import {storeToRefs} from 'pinia'
import {useAppStore} from '~/stores/useAppStore'
const {darkMode} = storeToRefs(useAppStore())

</script>
<NutProvider :dark="darkMode">
  <div class="p-3 bg-white rounded-md flex flex-wrap gap-3 dark:(bg-black!)" >
    <nut-button type="primary">Primary</nut-button>
    <nut-button type="info">Info</nut-button>
    <nut-button type="default">Default</nut-button>
    <nut-button type="danger">Danger</nut-button>
    <nut-button type="warning">Warning</nut-button>
    <nut-button type="success">Success</nut-button>
  </div>
</NutProvider>
