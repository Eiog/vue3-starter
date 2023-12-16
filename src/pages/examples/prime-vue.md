---
title: PrimeVueDemo
---
<script setup>
import { usePrimeVue } from 'primevue/config';
const PrimeVue = usePrimeVue();
function changeDark(){
  PrimeVue.config.dark =!PrimeVue.config.dark;
}
</script>

# PrimeVueDemo

<div class="p-3 bg-white rounded-md flex flex-wrap gap-3 dark:(bg-black!)" >
  <PButton label="Primary" />
  <PButton label="Secondary" severity="secondary" />
  <PButton label="Success" severity="success" />
  <PButton label="Info" severity="info" />
  <PButton label="Warning" severity="warning" />
  <PButton label="Help" severity="help" />
  <PButton label="Danger" severity="danger" />
</div>
