<script setup>
import react from '@images/icons/project-icons/react.png'
import { VDataTable } from 'vuetify/labs/VDataTable'

// import figma from '@images/icons/project-icons/figma.png'
// import html5 from '@images/icons/project-icons/html5.png'
// import python from '@images/icons/project-icons/python.png'
// import sketch from '@images/icons/project-icons/sketch.png'
// import vue from '@images/icons/project-icons/vue.png'
// import xamarin from '@images/icons/project-icons/xamarin.png'

const paginationMeta = (options, total) => {
  const start = (options.page - 1) * options.itemsPerPage + 1
  const end = Math.min(options.page * options.itemsPerPage, total)
  
  return `Showing ${total === 0 ? 0 : start} to ${end} of ${total} entries`
}

// Project Table Header
const projectTableHeaders = [
  {
    title: 'theme',
    key: 'theme',
  },
  {
    title: 'subject',
    key: 'subject',
  },
  {
    title: 'status',
    key: 'status',
  },
  {
    title: 'action',
    key: 'action',
    sortable: false,
  },
]

const projects = ref([])

const fetchProjectData = async () => {
  try {
    const { data } = await $api('/project')

    projects.value = data.data
  } catch (error) {
    console.error('Gagal mendapatkan data projek:', error)
  }
}

fetchProjectData()

const search = ref('')

const options = ref({
  page: 1,
  itemsPerPage: 5,
})

const moreList = [
  {
    title: 'Download',
    value: 'Download',
  },
  {
    title: 'Delete',
    value: 'Delete',
  },
  {
    title: 'View',
    value: 'View',
  },
]
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
      <h5 class="text-h5">
        Project List
      </h5>
      <div style="inline-size: 272px;">
        <AppTextField
          v-model="search"
          placeholder="Search"
        />
      </div>
    </VCardText>

    <VDivider />
    <!-- 👉 User Project List Table -->

    <!-- SECTION Datatable -->
    <VDataTable
      v-model:page="options.page"
      :headers="projectTableHeaders"
      :items-per-page="options.itemsPerPage"
      item-value="project"
      :items="projects"
      hide-default-footer
      :search="search"
      show-select
      class="text-no-wrap"
      @update:options="options = $event"
    >
      <!-- projects -->
      <template #item.theme="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            :size="38"
            class="me-3"
          >
            <VImg
              :src="react"
              size="28"
            />
          </VAvatar>
          <div>
            <p class="font-weight-medium mb-0">
              {{ item.theme }}
            </p>
            <p class="text-sm text-disabled mb-0">
              {{ item.subject }}
            </p>
          </div>
        </div>
      </template>

      <!-- status -->
      <template #item.status="{ item }">
        <div class="d-flex align-center gap-3">
          <span>{{ item.status }}</span>
        </div>
      </template>

      <!-- action -->
      <template #item.action>
        <MoreBtn
          :color="undefined"
          :menu-list="moreList"
        />
      </template>

      <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
      
      <template #bottom>
        <VDivider />

        <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
          <p class="text-sm text-disabled mb-0">
            {{ paginationMeta(options, projects.length) }}
          </p>

          <VPagination
            v-model="options.page"
            :total-visible="Math.ceil(projects.length / 5)"
            :length="Math.ceil(projects.length / 5)"
          >
            <template #next="slotProps">
              <VBtn
                v-bind="slotProps"
                :icon="false"
                variant="tonal"
                color="default"
              >
                Next
              </VBtn>
            </template>

            <template #prev="slotProps">
              <VBtn
                v-bind="slotProps"
                :icon="false"
                variant="tonal"
                color="default"
              >
                Previous
              </VBtn>
            </template>
          </VPagination>
        </div>
      </template>
    </VDataTable>
    <!-- !SECTION -->
  </VCard>
</template>
