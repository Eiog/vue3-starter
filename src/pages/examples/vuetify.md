---
title: Vuetify Demo
name: vuetify-demo
---

<script setup>
import {ref} from 'vue'
const dialog = ref(false)
</script>

# Vuetify Demo

## Button

<div>
  <v-btn>
    Button
  </v-btn>
</div>

## Dialog

<div>
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
</div>
