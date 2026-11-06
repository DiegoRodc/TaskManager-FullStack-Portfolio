<template>
  <div id="task-list">
    <v-list>
      <v-list-item
        v-for="task in tasks"
        :key="task._id"
      >
        <template v-slot:prepend>
          <v-btn variant="text" @click="updateTask(task)">
            <v-icon
              v-if="task.done"
              icon="mdi-checkbox-marked"
            ></v-icon>
            <v-icon
              v-else
              icon="mdi-checkbox-blank-outline"
            ></v-icon>
          </v-btn>
        </template>

        <v-list-item-title>
          {{ task.text }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ formatTaskDate(task.date) }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            icon="mdi-trash-can"
            color="red"
            variant="text"
            @click="deleteTask(task)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { formatDate } from '@/util'

export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
    updateTask: {
      type: Function,
      required: true,
    },
    deleteTask: {
      type: Function,
      required: true,
    },
  },
  methods: {
  formatTaskDate (date) {
    if (!date) return ''

    const d = new Date(date)

    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  },
},
}
</script>