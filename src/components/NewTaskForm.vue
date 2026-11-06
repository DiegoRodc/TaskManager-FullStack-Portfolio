<template>
  <div id="new-task-form">
    <v-form @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <v-text-field
              label="Add a task..."
              prepend-inner-icon="mdi-pencil"
              required
              v-model="form.Text"
            ></v-text-field>
          </v-col>

          <v-col cols="12" xs="12" sm="4">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-text-field
                  label="When should the task be done?"
                  prepend-inner-icon="mdi-calendar"
                  :model-value="formattedDate"
                  readonly
                  v-bind="props"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="form.Date"
                @update:model-value="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" xs="4" offset-xs="4" sm="2">
            <v-btn class="mt-3" type="submit" text color="success" block>
              <v-icon left>mdi-plus</v-icon>
              Add Task
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { formatDate } from '@/util'

export default {
  name: 'NewTaskForm',
  props: {
    form: {
      type: Object,
      required: true,
    },
    addTask: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    menu: false,
  }),
  computed: {
    formattedDate () {
      return this.form.Date ? formatDate(this.form.Date) : ''
    },
  },
  methods: {
    onSubmit () {
      // This guarantees the parent method runs when you click Add Task
      this.addTask(this.form)
    },
  },
}
</script>

<style scoped>
form {
  padding: 0 1rem;
}
</style>