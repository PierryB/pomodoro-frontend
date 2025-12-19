<template>
  <div class="space-y-4">
    <!-- Cabeçalho -->
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
      Minhas Tarefas
    </h2>
    
    <!-- Loading -->
    <div v-if="taskStore.loading" class="text-center py-8">
      <div class="inline-flex items-center gap-2">
        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-secondary-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
      <p class="text-gray-600 dark:text-gray-400 mt-4">Carregando tarefas...</p>
    </div>

    <!-- Lista de Tarefas -->
    <div v-else class="space-y-3">
      <div
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="card-hover p-4 animate-fade-in"
      >
        <div class="flex items-center justify-between">
          <!-- Checkbox e Conteúdo -->
          <div class="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              :checked="task.isCompleted"
              @change="toggleTask(task)"
              class="w-5 h-5 text-green-600 rounded-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
              style="transition: box-shadow 200ms, transform 200ms;"
            />
            <div class="flex-1">
              <h3
                :class="[
                  'font-semibold',
                  task.isCompleted
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-800 dark:text-gray-200'
                ]"
              >
                {{ task.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ task.description }}
              </p>
            </div>
          </div>
          
          <!-- Badge e Ações -->
          <div class="flex items-center gap-2">
            <span :class="['badge', priorityClass(task.priority)]">
              {{ priorityEmoji(task.priority) }} {{ priorityLabel(task.priority) }}
            </span>
            <button
              @click="deleteTask(task.id)"
              class="btn-danger px-3 py-1.5 text-sm"
              title="Deletar tarefa"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="taskStore.tasks.length === 0" 
        class="card text-center py-12"
      >
        <div class="text-6xl mb-4">📝</div>
        <p class="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
          Nenhuma tarefa cadastrada
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Comece adicionando sua primeira tarefa!
        </p>
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

// Classes de prioridade usando as novas classes utilitárias
const priorityClass = (priority) => {
  const classes = {
    High: 'badge-error',
    Medium: 'badge-warning',
    Low: 'badge-success'
  }
  return classes[priority] || 'badge-primary'
}

// Emojis de prioridade
const priorityEmoji = (priority) => {
  const emojis = {
    High: '🔥',
    Medium: '⚡',
    Low: '🌱'
  }
  return emojis[priority] || '📌'
}

// Labels traduzidas
const priorityLabel = (priority) => {
  const labels = {
    High: 'Alta',
    Medium: 'Média',
    Low: 'Baixa'
  }
  return labels[priority] || priority
}
</script>

<style scoped>
/* Animação de entrada com delay */
.animate-fade-in:nth-child(1) { animation-delay: 0s; }
.animate-fade-in:nth-child(2) { animation-delay: 0.05s; }
.animate-fade-in:nth-child(3) { animation-delay: 0.1s; }
.animate-fade-in:nth-child(4) { animation-delay: 0.15s; }
.animate-fade-in:nth-child(5) { animation-delay: 0.2s; }
</style>
