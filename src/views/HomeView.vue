<template>
  <div class="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex items-center justify-between mb-8">
        <div class="hidden lg:block w-48"></div>
        
        <div class="flex-1 text-center">
          <div class="flex items-center justify-center gap-3 mb-2">
            <ClipboardIcon 
              :size="40" 
              class="text-green-600"
            />
            <h1
              class="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent py-2 leading-tight"
            >
              Taskfy
            </h1>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg">Organize seu dia com estilo e produtividade</p>
        </div>

        <div class="flex-shrink-0">
          <div class="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <ThemeToggle />
            <div class="hidden sm:flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">{{ userInitial }}</span>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ userName }}</span>
            </div>
            <button
              @click="handleLogout"
              class="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              title="Sair"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1">
        <TaskForm />
      </div>

      <div class="lg:col-span-2 space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            📋 Minhas Tarefas
            <span
              class="text-sm font-normal text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm"
            >
              {{ filteredTasks.length }}
            </span>
          </h2>
          
          <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:inline">Ordenar:</span>
            <button
              @click="sortBy = 'default'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                sortBy === 'default'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              📅 Padrão
            </button>
            <button
              @click="sortBy = 'name'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                sortBy === 'name'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              🔤 Nome
            </button>
            <button
              @click="sortBy = 'priority'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                sortBy === 'priority'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              🎯 Prioridade
            </button>
          </div>
        </div>

        <div v-if="availableCategories.length > 0" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <span>🏷️</span>
              Filtrar por categoria:
            </span>
            <button
              @click="selectedCategory = null"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                selectedCategory === null
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              ]"
            >
              📂 Todas
            </button>
            <button
              v-for="category in availableCategories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                selectedCategory === category
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              ]"
            >
              {{ getCategoryEmoji(category) }} {{ category }}
            </button>
          </div>
        </div>

        <div v-if="taskStore.loading" class="text-center py-16">
          <div class="inline-flex items-center gap-2">
            <div class="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
              style="animation-delay: 0.1s"
            ></div>
            <div
              class="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mt-4">Carregando suas tarefas...</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="task in sortedTasks"
            :key="task.id"
            :class="[
              'group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-xl duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500',
              { 'opacity-60 pointer-events-none': isTaskLoading(task.id) }
            ]"
            style="transition: opacity 200ms, box-shadow 300ms, transform 300ms;"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4 flex-1 min-w-0">
                <div class="flex-shrink-0 pt-1 relative">
                  <input
                    type="checkbox"
                    :checked="task.isCompleted"
                    :disabled="isTaskLoading(task.id)"
                    @change="toggleTask(task)"
                    :class="[
                      'w-5 h-5 text-green-600 rounded-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all',
                      isTaskLoading(task.id) ? 'cursor-wait opacity-50' : 'cursor-pointer'
                    ]"
                    style="transition: opacity 200ms, box-shadow 200ms, transform 200ms;"
                  />
                  <!-- Loading spinner -->
                  <div 
                    v-if="isTaskLoading(task.id)"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <div class="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3
                    :class="[
                      'font-semibold text-lg mb-1',
                      task.isCompleted
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400',
                    ]"
                  >
                    {{ task.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{{ task.description }}</p>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      v-if="task.category"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                    >
                      {{ getCategoryEmoji(task.category) }} {{ task.category }}
                    </span>
                    <span
                      :class="[
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                        priorityClass(task.priority),
                      ]"
                    >
                      {{ priorityEmoji(task.priority) }} {{ priorityLabel(task.priority) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  @click="editTask(task)"
                  :disabled="isTaskLoading(task.id)"
                  class="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                  style="transition: transform 200ms, opacity 200ms;"
                  title="Editar tarefa"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteTask(task)"
                  :disabled="isTaskLoading(task.id)"
                  class="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                  style="transition: transform 200ms, opacity 200ms;"
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
          </div>

          <div
            v-if="taskStore.tasks.length === 0"
            class="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700"
          >
            <div class="text-6xl mb-4">📝</div>
            <p class="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">Nenhuma tarefa ainda</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Comece adicionando sua primeira tarefa!</p>
          </div>

          <div
            v-else-if="sortedTasks.length === 0"
            class="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700"
          >
            <div class="text-6xl mb-4">🔍</div>
            <p class="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">Nenhuma tarefa encontrada</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Não há tarefas na categoria "{{ selectedCategory }}"</p>
            <button
              @click="selectedCategory = null"
              class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all"
            >
              Ver todas as tarefas
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TaskDeleteModal
    :is-open="showDeleteModal"
    :task="taskToDelete"
    @close="showDeleteModal = false"
    @deleted="handleTaskDeleted"
  />

  <TaskEditModal
    :is-open="showEditModal"
    :task="taskToEdit"
    @close="showEditModal = false"
    @saved="handleTaskSaved"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { useAuthStore } from '@/stores/authStore'
import TaskForm from '@/components/TaskForm.vue'
import TaskEditModal from '@/components/TaskEditModal.vue'
import TaskDeleteModal from '@/components/TaskDeleteModal.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const taskStore = useTaskStore()
const authStore = useAuthStore()
const sortBy = ref('default')
const selectedCategory = ref(null)
const showDeleteModal = ref(false)
const taskToDelete = ref(null)
const showEditModal = ref(false)
const taskToEdit = ref(null)
const loadingTasks = ref(new Set())

const userName = computed(() => authStore.currentUser?.name || authStore.currentUser?.email || 'Usuário')
const userInitial = computed(() => {
  const name = authStore.currentUser?.name || authStore.currentUser?.email || 'U'
  return name.charAt(0).toUpperCase()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  taskStore.fetchTasks()
})

const availableCategories = computed(() => {
  const categories = taskStore.tasks
    .map(task => task.category)
    .filter(category => category && category.trim() !== '')
  return [...new Set(categories)].sort()
})

watch(availableCategories, (newCategories) => {
  if (selectedCategory.value !== null && !newCategories.includes(selectedCategory.value)) {
    selectedCategory.value = null
  }
})

const filteredTasks = computed(() => {
  if (!selectedCategory.value) {
    return taskStore.tasks
  }
  return taskStore.tasks.filter(task => task.category === selectedCategory.value)
})

const sortedTasks = computed(() => {
  const tasks = [...filteredTasks.value]
  
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
  
  return tasks
})

const categoryEmojiMap = {
  'Trabalho': '💼',
  'Estudos': '📚',
  'Pessoal': '👤',
  'Saúde': '💪',
  'Financeiro': '💰',
  'Casa': '🏠',
  'Lazer': '🎮',
  'Família': '👨‍👩‍👧‍👦'
}

const getCategoryEmoji = (category) => {
  return categoryEmojiMap[category] || '🏷️'
}

const toggleTask = async (task) => {
  if (loadingTasks.value.has(task.id)) return
  
  loadingTasks.value.add(task.id)
  try {
    await taskStore.updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted,
    })
  } finally {
    loadingTasks.value.delete(task.id)
  }
}

const isTaskLoading = (taskId) => {
  return loadingTasks.value.has(taskId)
}

const deleteTask = (task) => {
  taskToDelete.value = task
  showDeleteModal.value = true
}

const handleTaskDeleted = () => {
  showDeleteModal.value = false
  taskToDelete.value = null
}

const editTask = (task) => {
  taskToEdit.value = task
  showEditModal.value = true
}

const handleTaskSaved = () => {
  showEditModal.value = false
  taskToEdit.value = null
}

const priorityClass = (priority) => {
  const classes = {
    High: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700',
    Medium: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700',
    Low: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700',
  }
  return classes[priority] || 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
}

const priorityEmoji = (priority) => {
  const emojis = {
    High: '🔥',
    Medium: '⚡',
    Low: '🌱',
  }
  return emojis[priority] || '📌'
}

const priorityLabel = (priority) => {
  const labels = {
    High: 'Alta',
    Medium: 'Média',
    Low: 'Baixa',
  }
  return labels[priority] || priority
}
</script>

<style scoped>
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
