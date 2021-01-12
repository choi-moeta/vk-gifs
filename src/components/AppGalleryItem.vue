<template>
  <div
    class='relative flex flex-col overflow-hidden transition-all transform scale-100 rounded group hover:z-10 focus-within:ring-2 ring-purple-500'
    :class='{
      "hover:scale-105 hover:-mb-9": !isImageLoading
    }'
  >
    <div class='flex w-full'>
      <div
        v-if='!isVideoShown'
        class='relative w-full bg-gray-900'
      >
        <div
          v-if='isImageLoading'
          :style='{
            "padding-bottom": `${Math.floor(ratio * 100)}%`,
          }'
        >
        </div>
        <img
          :src='photo'
          :alt='alt'
          :ratio='ratio'
          class='w-full'
          :class='{
            "hidden": isImageLoading
          }'
          @load='isImageLoading = false'
        >
        <button
          v-if='!isImageLoading'
          class='absolute text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 focus:outline-none focus-visible:text-purple-500 focus-visible:opacity-100 opacity-70 hover:opacity-100'
          aria-label='play'
          @click='isVideoShown = true'
        >
          <svg
            class='w-20 h-20 fill-current'
            viewBox='0 0 24 24'
          ><path d='M0 0h24v24H0z' fill='none' /><path d='M8 5v14l11-7z' /></svg>
        </button>
      </div>
      <video
        v-if='isVideoShown'
        ref='video'
        class='w-full focus:outline-none focus-visible:outline'
        :poster='photo'
        controls
        loop
        muted
        autoplay
      >
        <source width='450' :src='video' type='video/mp4'>
        unlucky
      </video>
    </div>
    <div
      class='flex items-center w-full h-0 gap-6 px-6 overflow-hidden transition-all bg-gray-900 links dark:bg-black top-full'
      :class='{
        "group-hover:h-9 group-focus:h-9 focus-within:h-9": !isImageLoading
      }'
    >
      <a
        v-for='type of Object.keys(types)'
        :key='type'
        :href='types[type]'
        class='link dark:link-dark pb-0.5'
      >{{ type }}</a>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineProps, ref } from 'vue'

const props = defineProps({
  video: String,
  photo: String,
  gif: String,
  ratio: {
    type: Number,
    default: 16 / 9,
  },
  alt: {
    type: String,
    default: '',
  },
})

let isImageLoading = ref(true)
let isVideoShown = ref(false)

const types = computed(() => ({
  vid: props.video,
  pic: props.photo,
  gif: props.gif,
}))
</script>
