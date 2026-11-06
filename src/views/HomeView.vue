<template>
  <div class="home">
    <v-container>
      <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
        {{ errorMessage }}
      </v-alert>

      <v-progress-linear v-if="loading" indeterminate color="primary" />

      <v-card v-if="fetched" class="mx-auto" max-width="900">
        <NewTaskForm :form="form" :addTask="createTask" />

        <v-divider></v-divider>

        <v-list subheader two-line flat>
          <v-list-subheader>Tasks</v-list-subheader>
          <TaskList
            :tasks="tasks"
            :updateTask="updateTask"
            :deleteTask="deleteTask"
          />
          <v-list-item v-if="tasks.length === 0">
            <v-list-item-title>No tasks yet. Add your first task above.</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getCurrentDate } from '@/util'
import { apiUrl } from '@/config'
import TaskList from '@/components/TaskList.vue'
import NewTaskForm from '@/components/NewTaskForm.vue'

export default {
  name: 'HomeView',
  components: { TaskList, NewTaskForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      fetched: false,
      errorMessage: '',
      tasks: [],
      form: {
        Text: '',
        Date: getCurrentDate(),
        Done: false
      }
    }
  },
  mounted () {
    this.readTasks()
  },
  methods: {
    async readTasks () {
      this.loading = true
      this.errorMessage = ''

      try {
        const response = await fetch(apiUrl('/api/v1/tasks'), {
          credentials: 'include'
        })
        if (!response.ok) {
          throw new Error(`Could not load tasks (HTTP ${response.status}).`)
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The task API returned an unexpected response.')
        }

        this.tasks = data
        this.fetched = true
      } catch (error) {
        this.errorMessage = error.message || 'An unexpected error occurred while loading tasks.'
      } finally {
        this.loading = false
      }
    },

    async createTask () {
      const text = this.form.Text.trim()
      if (!text) {
        this.errorMessage = 'Enter a task before submitting.'
        return
      }

      this.errorMessage = ''
      try {
        const response = await fetch(apiUrl('/api/v1/tasks'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ text, date: this.form.Date })
        })
        if (!response.ok) {
          throw new Error(`Could not create task (HTTP ${response.status}).`)
        }

        this.form.Text = ''
        this.form.Date = getCurrentDate()
        await this.readTasks()
      } catch (error) {
        this.errorMessage = error.message || 'An unexpected error occurred while creating the task.'
      }
    },

    async updateTask (task) {
      this.errorMessage = ''
      try {
        const response = await fetch(apiUrl(`/api/v1/tasks/${encodeURIComponent(task._id)}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ done: !task.done })
        })
        if (!response.ok) {
          throw new Error(`Could not update task (HTTP ${response.status}).`)
        }

        await this.readTasks()
      } catch (error) {
        this.errorMessage = error.message || 'An unexpected error occurred while updating the task.'
      }
    },

    async deleteTask (task) {
      this.errorMessage = ''
      try {
        const response = await fetch(apiUrl(`/api/v1/tasks/${encodeURIComponent(task._id)}`), {
          method: 'DELETE',
          credentials: 'include'
        })
        if (!response.ok) {
          throw new Error(`Could not delete task (HTTP ${response.status}).`)
        }

        await this.readTasks()
      } catch (error) {
        this.errorMessage = error.message || 'An unexpected error occurred while deleting the task.'
      }
    }
  }
}
</script>

<style scoped>
.form {
  padding: 0 1rem;
}
</style>
