<template>
  <main class='flex items-center justify-center h-screen text-3xl'>
    <a
      :href='getAuthLink()'
      class='pb-2 border-b-2 link link-line dark:link-dark'
    >just login with vk</a>
  </main>
</template>

<script setup lang='ts'>
import { getAuthLink } from '/@/api'
</script>
