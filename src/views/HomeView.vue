<template>
  <div class="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="text-center mb-8">
        <h1
          class="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 py-2 leading-tight"
        >
          ✨ Task Manager
        </h1>
        <p class="text-gray-600 text-lg">Organize seu dia com estilo e produtividade</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Formulário para adicionar nova tarefa -->
      <div class="lg:col-span-1">
        <TaskForm />
      </div>

      <!-- Lista de tarefas -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            📋 Minhas Tarefas
            <span
              class="text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm"
            >
              {{ taskStore.tasks.length }}
            </span>
          </h2>
          
          <!-- Filtros de Ordenação -->
          <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
            <span class="text-sm font-medium text-gray-600 hidden sm:inline">Ordenar:</span>
            <button
              @click="sortBy = 'default'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                sortBy === 'default'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              📅 Padrão
            </button>
            <button
              @click="sortBy = 'name'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                sortBy === 'name'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              🔤 Nome
            </button>
            <button
              @click="sortBy = 'priority'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                sortBy === 'priority'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              ⭐ Prioridade
            </button>
          </div>
        </div>

        <div v-if="taskStore.loading" class="text-center py-16">
          <div class="inline-flex items-center gap-2">
            <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
              style="animation-delay: 0.1s"
            ></div>
            <div
              class="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
          </div>
          <p class="text-gray-600 mt-4">Carregando suas tarefas...</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="task in sortedTasks"
            :key="task.id"
            class="group bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4 flex-1 min-w-0">
                <div class="flex-shrink-0 pt-1">
                  <input
                    type="checkbox"
                    :checked="task.isCompleted"
                    @change="toggleTask(task)"
                    class="w-5 h-5 text-indigo-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer transition-all"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3
                    :class="[
                      'font-semibold text-lg mb-1 transition-all',
                      task.isCompleted
                        ? 'line-through text-gray-400'
                        : 'text-gray-800 group-hover:text-indigo-600',
                    ]"
                  >
                    {{ task.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ task.description }}</p>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      :class="[
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all',
                        priorityClass(task.priority),
                      ]"
                    >
                      {{ priorityEmoji(task.priority) }} {{ task.priority }}
                    </span>
                  </div>
                </div>
              </div>

              <button
                @click="deleteTask(task)"
                class="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Deletar tarefa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-if="taskStore.tasks.length === 0"
            class="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200"
          >
            <div class="text-6xl mb-4">📝</div>
            <p class="text-gray-600 text-lg font-medium mb-2">Nenhuma tarefa ainda</p>
            <p class="text-gray-500 text-sm">Comece adicionando sua primeira tarefa!</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Confirmação de Exclusão -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="showDeleteModal = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
          @click.stop
        >
          <!-- Ícone -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>

          <!-- Título e Descrição -->
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Excluir Tarefa?</h3>
            <p class="text-gray-600">
              Tem certeza que deseja excluir "<span class="font-semibold">{{ taskToDelete?.title }}</span>"?
              Esta ação não pode ser desfeita.
            </p>
          </div>

          <!-- Botões -->
          <div class="flex gap-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button
              @click="confirmDelete"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from '@/components/TaskForm.vue'

const taskStore = useTaskStore()
const sortBy = ref('default')
const showDeleteModal = ref(false)
const taskToDelete = ref(null)

onMounted(() => {
  taskStore.fetchTasks()
})

// Computed property para ordenar as tarefas
const sortedTasks = computed(() => {
  const tasks = [...taskStore.tasks]
  
  if (sortBy.value === 'name') {
    return tasks.sort((a, b) => a.title.localeCompare(b.title))
  }
  
  if (sortBy.value === 'priority') {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    return tasks.sort((a, b) => {
      const orderA = priorityOrder[a.priority] || 999
      const orderB = priorityOrder[b.priority] || 999
      return orderA - orderB
    })
  }
  
  // default: ordem original (por data de criação)
  return tasks
})

const toggleTask = async (task) => {
  await taskStore.updateTask(task.id, {
    ...task,
    isCompleted: !task.isCompleted,
  })
}

const deleteTask = (task) => {
  taskToDelete.value = task
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (taskToDelete.value) {
    await taskStore.deleteTask(taskToDelete.value.id)
    showDeleteModal.value = false
    taskToDelete.value = null
  }
}

const priorityClass = (priority) => {
  const classes = {
    High: 'bg-red-50 text-red-700 border border-red-200',
    Medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }
  return classes[priority] || 'bg-gray-50 text-gray-700 border border-gray-200'
}

const priorityEmoji = (priority) => {
  const emojis = {
    High: '🔥',
    Medium: '⚡',
    Low: '🌱',
  }
  return emojis[priority] || '📌'
}
</script>

<style scoped>
/* Animações do Modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: all 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
  opacity: 0;
}
</style>
