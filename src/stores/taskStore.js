import { defineStore } from 'pinia'
import { taskService } from '@/services/api'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter(t => t.isCompleted),
    pendingTasks: (state) => state.tasks.filter(t => !t.isCompleted),
    highPriorityTasks: (state) => state.tasks.filter(t => t.priority === 'High')
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await taskService.getAll()
        this.tasks = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createTask(task) {
      try {
        const response = await taskService.create(task)
        this.tasks.push(response.data)
      } catch (error) {
        this.error = error.message
      }
    },

    async updateTask(id, task) {
      try {
        const response = await taskService.update(id, task)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
      } catch (error) {
        this.error = error.message
      }
    },

    async deleteTask(id) {
      try {
        await taskService.delete(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (error) {
        this.error = error.message
      }
    }
  }
})
