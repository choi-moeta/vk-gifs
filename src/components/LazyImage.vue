<template>

</template>

<script setup lang='ts'>
import { defineProps, ref } from 'vue'

const props = defineProps({
  ratio: {
    type: Number,
    default: 0.5,
  },
})

let isLoading = ref(true)
</script>
