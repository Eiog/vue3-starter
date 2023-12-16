---
title: Vuetify Demo
name: vuetify-demo
---

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useAppStore} from '~/stores/useAppStore'
const dialog = ref(false)
const {darkMode} = storeToRefs(useAppStore())
</script>

## Button

<VuetifyProvider :dark="darkMode">
  <div class="p-3 bg-white rounded-md flex flex-wrap gap-3 dark:(bg-black!)" >
    <v-btn>Default</v-btn>
    <v-btn color="primary">Primary</v-btn>
    <v-btn color="secondary">Secondary</v-btn>
    <v-btn color="success">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>
  </div>
</VuetifyProvider>

## Dialog

<VuetifyProvider :dark="darkMode">
  <v-btn @click="dialog = true">
    {{dialog?'Dialog Is Opening':'Open Dialog'}}
  </v-btn>
  <v-dialog v-model="dialog" :width="500" >
    <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</VuetifyProvider>
