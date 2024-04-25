<script setup>
import { $data } from '@/utils/api'
import About from './About.vue'
import ActivityTimeline from './ActivityTimeline.vue'
import ProjectList from './ProjectList.vue'

const router = useRoute('pages-user-profile-tab')
const profileTabData = ref()

const fetchAboutData = async () => {
  if (router.params.tab === 'profile') {
    const data = await $data('/pages/profile', { query: { tab: router.params.tab } }).catch(err => console.log(err))

    profileTabData.value = data
  }
}

watch(router, fetchAboutData, { immediate: true })
</script>

<template>
  <VRow v-if="profileTabData">
    <VCol
      md="4"
      cols="12"
    >
      <About :data="profileTabData" />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <VRow>
        <VCol cols="12">
          <ActivityTimeline />
        </VCol>

        <VCol cols="12">
          <ProjectList />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
