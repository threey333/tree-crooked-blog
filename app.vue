<script setup lang="ts">
// import { useOverlayScrollbars } from 'overlayscrollbars-vue'

const [initBodyOverlayScrollbars] = useOverlayScrollbars({
  defer: true,
  options: {
    scrollbars: {
      theme: 'scrollbar-base scrollbar-auto py-1',
      clickScroll: true,
      autoHide: 'move',
      autoHideDelay: 500,
    },
  },
})

function initCustomScrollbars() {
  initBodyOverlayScrollbars(document.body)
}

onMounted(() => {
  initCustomScrollbars()
})
</script>

<template>
  <Html data-overlayscrollbars-initialize>
    <Body data-overlayscrollbars-initialize>
      <div class="page">
        <NuxtPage />
      </div>
    </Body>
  </Html>
</template>

<style scoped></style>
