<template>
  redirecting. . .
</template>

<script setup lang='ts'>
import { parseParams } from '/@/utils'
import { useStore } from '/@/store'
import { useRoute, useRouter } from 'vue-router'
import { ActionTypes } from '/@/store/actions'
import { onMounted } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

interface VKParams {
  user_id: string;
  access_token: string;
  expires_in: string;
}

onMounted(async () => {
  const params = parseParams(route.hash)
  await store.dispatch(ActionTypes.auth, {
    id: Number(params.user_id),
    accessToken: params.access_token,
    expiresIn: Number(params.expires_in),
  })
  router.push({ name: 'gallery' })
})
</script>
