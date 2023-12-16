//https://blog.vuejs.org/posts/vue-3-3
<script setup lang='ts' generic="T extends string">
interface Props {
  name?: string
}
const props = defineProps<Props & { extraProp?: T; msg?: string }>()
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
const { msg: propsMsg } = toRefs(props)
defineOptions({ inheritAttrs: false })
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
const value = defineModel<string>('value')
</script>

<template>
  <div class="flex-col gap-1 text-xl bg-white p-5 rounded-xl shadow-xl">
    <div>PropsMsg:{{ propsMsg }}</div>
    <div>Props:{{ props }}</div>
    <div class="flex gap-2">
      <button class="btn btn-neutral" @click="() => emit('foo', 1)">
        foo
      </button>
      <button class="btn btn-neutral" @click="() => emit('bar', 'bar', 1)">
        bar
      </button>
    </div>
    <div>
      <input v-model="value" type="text" class="input input-bordered input-primary" placeholder="请输入">
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
