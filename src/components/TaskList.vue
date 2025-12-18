<template>
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">Minhas Tarefas</h2>
      
      <div v-if="taskStore.loading" class="text-center py-8">
        <p class="text-gray-500">Carregando...</p>
      </div>
  
      <div v-else class="space-y-2">
        <div
          v-for="task in taskStore.tasks"
          :key="task.id"
          class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                :checked="task.isCompleted"
                @change="toggleTask(task)"
                class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <h3
                  :class="['font-medium', task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800']"
                >
                  {{ task.title }}
                </h3>
                <p class="text-sm text-gray-500">{{ task.description }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  priorityClass(task.priority)
                ]"
              >
                {{ task.priority }}
              </span>
              <button
                @click="deleteTask(task.id)"
                class="text-red-500 hover:text-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
  
        <div v-if="taskStore.tasks.length === 0" class="text-center py-8">
          <p class="text-gray-500">Nenhuma tarefa cadastrada</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useTaskStore } from '@/stores/taskStore'
  
  const taskStore = useTaskStore()
  
  onMounted(() => {
    taskStore.fetchTasks()
  })
  
  const toggleTask = async (task) => {
    await taskStore.updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted
    })
  }
  
  const deleteTask = async (id) => {
    if (confirm('Deseja realmente deletar esta tarefa?')) {
      await taskStore.deleteTask(id)
    }
  }
  
  const priorityClass = (priority) => {
    const classes = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-green-100 text-green-800'
    }
    return classes[priority] || 'bg-gray-100 text-gray-800'
  }
  </script>
