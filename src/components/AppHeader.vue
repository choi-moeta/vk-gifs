<template>
  <header class='w-full flex flex-row justify-center mt-1.5 mb-2'>
    <RouterLink class='link dark:link-dark' :to='{ name: "gallery" }'>
      gallery
    </RouterLink>
    <div class='divider dark:divider-dark' />
    <RouterLink class='link dark:link-dark' :to='{ name: "settings" }'>
      settings
    </RouterLink>
    <div class='divider dark:divider-dark' />
    <button type='button' class='link dark:link-dark' @click.prevent='logout'>
      logout
    </button>
  </header>
</template>

<script setup lang='ts'>
import { useStore } from '/@/store'
import { useRouter } from 'vue-router'
import { ActionTypes } from '/@/store/actions'

const store = useStore()
const router = useRouter()

const logout = () => {
  store.dispatch(ActionTypes.logout)
  router.push({ name: 'auth' })
}
</script>

<style>
.divider::after {
  content: '/@/';
  @apply text-gray-500 mx-2;
}
@variants dark {
  .divider-dark::after {
    @apply divider text-gray-600;
  }
}
</style>
