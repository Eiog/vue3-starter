---
title: NaiveUi Demo
name: naive-ui-demo
---

<script setup>
import NaiveProvider from '~/components/NaiveProvider.vue'
import {storeToRefs} from 'pinia'
import {useAppStore} from '~/stores/useAppStore'

const {darkMode,language} = storeToRefs(useAppStore())

</script>

# Naive Ui
## Button
<NaiveProvider :dark="darkMode" :locale="language">
  <div class="p-3 bg-white rounded-md flex flex-wrap gap-3 dark:(bg-black!)" >
    <n-button>Default</n-button>
    <n-button type="tertiary">
      Tertiary
    </n-button>
    <n-button type="primary">
      Primary
    </n-button>
    <n-button type="info">
      Info
    </n-button>
    <n-button type="success">
      Success
    </n-button>
    <n-button type="warning">
      Warning
    </n-button>
    <n-button type="error">
      Error
    </n-button>
  </div>
</NaiveProvider>
