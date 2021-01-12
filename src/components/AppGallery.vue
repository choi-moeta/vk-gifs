<template>
  <div class='flex flex-row max-w-full gap-4 m-2'>
    <div
      v-for='(column, i) of columns'
      :key='i'
      class='flex flex-col flex-1 gap-4'
    >
      <GalleryItem
        v-for='gif of column'
        :key='gif.gif'
        class='gallery__item'
        :video='gif.video'
        :photo='gif.photo'
        :gif='gif.gif'
        :ratio='gif.ratio'
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import GalleryItem from '/@/components/AppGalleryItem.vue'
import { useStore } from '/@/store'
import { ActionTypes } from '/@/store/actions'
import type { Gif } from '/@/store/state'
import { computed, onMounted } from 'vue'

const store = useStore()

const columnsCount = computed(() => store.state.settings.columnsCount)

const gifs = computed(() => store.state.gifs?.items || [])
const columns = computed<Gif[][]>(() => {
  if (!gifs.value.length) return []

  let count = columnsCount.value
  let columns: Gif[][] = new Array(columnsCount.value).fill(0).map(e => [])

  for (let i = 0; i < gifs.value.length; i++) {
    columns[i % columnsCount.value].push(gifs.value[i])
  }

  return columns
})

onMounted(async () => {
  await store.dispatch(ActionTypes.fetchGifsFirstBatch)
  // await store.dispatch(ActionTypes.fetchGifs)

  let isFetching = false

  async function infiniteScroll() {
    if (document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < window.innerHeight / 2 && !isFetching) {
      isFetching = true
      await store.dispatch(ActionTypes.fetchGifs)
      isFetching = false
    }
  }
  infiniteScroll()
  window.addEventListener('scroll', infiniteScroll)
})
</script>
