<script setup>
import { ref } from 'vue'

const avatar2 = import.meta.env.VITE_API_IMAGE_URL + '/guru/'
const tasks = ref([])

const fetchProjectData = async () => {
  try {
    const { data } = await $api('/task')

    tasks.value = data.data
  } catch (error) {
    console.error('Gagal mendapatkan data projek:', error)
  }
}

fetchProjectData()
</script>

<template>
  <VCard>
    <VCardItem>
      <template #prepend>
        <VIcon icon="tabler-timeline" />
      </template>

      <VCardTitle>Timeline Task</VCardTitle>

      <template #append>
        <div>
          <MoreBtn
            :menu-list="[
              { title: 'Share timeline', value: 'Share timeline' },
              { title: 'Suggest edits', value: 'Suggest edits' },
              { title: 'Report bug', value: 'Report bug' },
            ]"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VTimeline
        density="compact"
        align="start"
        truncate-line="both"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="task in tasks"
          :key="task.id"
          :dot-color="task.status == 'Not Started' ? 'warning' : (task.status == 'In Progress' ? 'success' : (task.status == 'Completed' ? 'primary' : 'error'))"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <span class="app-timeline-title">
              {{ task?.name }}
            </span>
            <span class="app-timeline-meta">{{ task?.student_name }}</span>
          </div>
          <p class="app-timeline-text mb-2">
            {{ task?.project_name }}
          </p>

          <div
            v-if="task?.accepted == 1"
            class="d-flex align-center mt-3"
          >
            <VAvatar
              size="38"
              class="me-3"
              :image="avatar2+task?.teacher_id+'.png'"
            />
            <div>
              <h6 class="text-sm font-weight-medium mb-n1">
                Accepted by: {{ task?.teacher_name }}
              </h6>
              <span class="app-timeline-meta">
                {{ task?.review }}
              </span>
            </div>
          </div>

          <div
            v-else
            class="d-flex align-center mt-3"
          >
            <VIcon
              :color="task.teacher_id == null ? 'warning' : 'success'"
              :icon="task.teacher_id == null ? 'tabler-alert-triangle' : 'tabler-file-text'"
              size="20"
              class="me-2"
            />
            <h6 class="font-weight-medium text-xs me-3">
              {{ task?.review }}
            </h6>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
