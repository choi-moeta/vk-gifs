<template>
  <div class='grid items-center px-4 mx-auto mt-12 settings w-max gap-y-4 gap-x-8'>
    <label class='settings__label' for='columnsCount'>column count</label>
    <input
      id='columnsCount'
      v-model='columnsCount'
      class='input dark:input-dark'
      type='number'
    >
    <!-- <label class='settings__label' for='columnWidth'>minimum column width</label>
    <input
      id='columnWidth'
      v-model='columnWidth'
      class='input dark:input-dark'
      type='number'
    > -->
    <label class='settings__label' for='firstBatchCount'>first load count</label>
    <input
      id='firstBatchCount'
      v-model='firstBatchCount'
      class='input dark:input-dark'
      type='number'
    >
    <label class='settings__label' for='fetchCount'>load count</label>
    <input
      id='fetchCount'
      v-model='fetchCount'
      class='input dark:input-dark'
      type='number'
    >
    <!-- <div>color theme</div>
    <div class='flex flex-row gap-4 mt-1'>
      <button
        v-for='theme of themes'
        :key='theme'
        class='link link-line dark:link-dark'
        :class='isActive(theme)'
        @click='setTheme(theme)'
      >
        {{ theme }}
      </button>
    </div> -->
    <button
      class='mt-6 link link-line dark:link-dark w-max'
      @click='logout'
    >
      logout
    </button>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { MutationType } from '/@/store/mutations'
import { setDark, setLight, setSystem, getCurrent } from '/@/utils/theme'
import type { themeTypes } from '/@/utils/theme'
import { useStore } from '/@/store'
import { useRouter } from 'vue-router'
import { ActionTypes } from '/@/store/actions'

const store = useStore()
const router = useRouter()

const themes: themeTypes[] = [ 'light', 'dark', 'system' ]
let currentTheme = ref(getCurrent())

const isActive = (type: themeTypes) => {
  return {
    'link-active': currentTheme.value === type,
    'dark:link-dark-active': currentTheme.value === type,
  }
}
const setTheme = (type: themeTypes) => {
  if (type === 'dark') {
    setDark()
  } else if (type === 'light') {
    setLight()
  } else if (type === 'system') {
    setSystem()
  }
  currentTheme.value = getCurrent()
}

const columnsCount = computed({
  set: value => store.commit(MutationType.setSettingsColumnsCount, Number(value)),
  get: () => store.state.settings.columnsCount,
})
const columnWidth = computed({
  set: value => store.commit(MutationType.setSettingsColumnWidth, Number(value)),
  get: () => store.state.settings.columnWidth,
})
const firstBatchCount = computed({
  set: value => store.commit(MutationType.setSettingsFirstBatchCount, Number(value)),
  get: () => store.state.settings.firstBatchCount,
})
const fetchCount = computed({
  set: value => store.commit(MutationType.setSettingsFetchCount, Number(value)),
  get: () => store.state.settings.fetchCount,
})

const logout = () => {
  store.dispatch(ActionTypes.logout)
  router.push({ name: 'auth' })
}

</script>

<style scoped>
.settings {
  grid-template-columns: max-content minmax(100px, 1fr);
  grid-template-columns: max-content max-content;
}
</style>
