<template>
  <main class='flex items-center justify-center h-screen text-3xl'>
    <a
      :href='apiAuthLink'
      class='pb-2 border-b-2 link link-line dark:link-dark'
    >just login with vk</a>
  </main>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

const apiAuthLink = computed(() => `https://oauth.vk.com/authorize?client_id=7601179&redirect_uri=${window.location.origin}/token&scope=docs&response_type=token`)
</script>
