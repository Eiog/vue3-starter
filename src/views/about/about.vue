<script setup lang="ts">
const list = ref([
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '🥳',
  '😏',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁',
  '☹️',
  '😣',
  '😖',
  '😫',
  '😩',
  '🥺',
  '😢',
  '😭',
  '😤',
  '😠',
  '😡',
  '🤬',
  '🤯',
  '😳',
  '🥵',
  '🥶',
  '😱',
  '😨',
  '😰',
  '😥',
  '😓',
  '🤗',
  '🤔',
  '🤭',
  '🤫',
  '🤥',
  '😶',
  '😐',
  '😑',
  '😬',
  '🙄',
  '😯',
  '😦',
  '😧',
  '😮',
  '😲',
  '🥱',
  '😴',
  '🤤',
  '😪',
  '😵',
  '🤐',
  '🥴',
  '🤢',
  '🤮',
  '🤧',
  '😷',
  '🤒',
  '🤕',
  '🤑',
  '🤠',
  '😈',
  '👿',
  '👹',
  '👺',
  '🤡',
  '💩',
  '👻',
  '💀',
  '☠️',
  '👽',
  '👾',
  '🤖',
  '🎃',
  '😺',
  '😸',
  '😹',
  '😻',
  '😼',
  '😽',
  '🙀',
  '😿',
  '😾',
]);
const handleAdd = () => {
  const i = Math.round(Math.random() * list.value.length);
  list.value.splice(
    i,
    0,
    list.value[Math.round(Math.random() * list.value.length)],
  );
};
const handleRemove = (index: number) => {
  list.value.splice(index, 1);
};
</script>
<template>
  <div wfull>
    <TransitionGroup relative flex="~ wrap" tag="div" name="fade">
      <div
        w10
        h10
        rounded-full
        flex-center
        cursor-pointer
        transition-colors
        text-2xl
        relative
        bg="white hover:gray2"
        key="add"
        @click="handleAdd"
      >
        <i i-ri-add-fill></i>
      </div>
      <div
        w10
        h10
        rounded-full
        flex-center
        cursor-pointer
        transition-colors
        text-2xl
        relative
        bg="white hover:gray2"
        v-for="(item, index) in list"
        :key="item"
      >
        <div
          absolute
          inset-0
          flex-center
          transition="colors opacity"
          bg="white/0 hover:white/100"
          opacity0
          hover="opacity100"
          @click="handleRemove(index)"
        >
          <i i-ri-close-fill></i>
        </div>
        {{ item }}
      </div>
    </TransitionGroup>
  </div>
</template>
<style scoped lang="less">
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
