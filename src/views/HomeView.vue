<template>
  <div class="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <!-- User Info & Logout -->
      <div class="flex justify-end mb-4">
        <div class="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-bold">{{ userInitial }}</span>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
          </div>
          <button
            @click="handleLogout"
            class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
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
              {{ filteredTasks.length }}
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

        <!-- Filtros de Categoria -->
        <div v-if="availableCategories.length > 0" class="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <span>🏷️</span>
              Filtrar por categoria:
            </span>
            <button
              @click="selectedCategory = null"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                selectedCategory === null
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
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
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              ]"
            >
              {{ getCategoryEmoji(category) }} {{ category }}
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
                      v-if="task.category"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 transition-all"
                    >
                      {{ getCategoryEmoji(task.category) }} {{ task.category }}
                    </span>
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

              <div class="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  @click="editTask(task)"
                  class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
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
                  class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

  <!-- Modal de Edição de Tarefa -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        @click.self="showEditModal = false"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 transform transition-all my-8"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Editar Tarefa</h3>
            </div>
            <button
              @click="showEditModal = false"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="saveEdit" class="space-y-5">
            <!-- Título -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span class="text-lg">📝</span>
                Título *
              </label>
              <input
                v-model="editForm.title"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-50 focus:bg-white"
                placeholder="Ex: Estudos"
              />
            </div>

            <!-- Descrição -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span class="text-lg">💭</span>
                Descrição
              </label>
              <textarea
                v-model="editForm.description"
                rows="3"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none bg-gray-50 focus:bg-white"
                placeholder="Detalhes sobre sua tarefa..."
              ></textarea>
            </div>

            <!-- Categoria -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span class="text-lg">🏷️</span>
                Categoria
              </label>
              <div class="space-y-3">
                <input
                  v-model="editForm.category"
                  type="text"
                  list="edit-categories"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="Ex: Trabalho, Estudos, Pessoal..."
                />
                <datalist id="edit-categories">
                  <option value="Trabalho"></option>
                  <option value="Estudos"></option>
                  <option value="Pessoal"></option>
                  <option value="Saúde"></option>
                  <option value="Financeiro"></option>
                  <option value="Casa"></option>
                  <option value="Lazer"></option>
                  <option value="Família"></option>
                </datalist>
                
                <!-- Categorias Rápidas -->
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="cat in quickEditCategories"
                    :key="cat.name"
                    type="button"
                    @click="editForm.category = cat.name"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border-2',
                      editForm.category === cat.name
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50'
                    ]"
                  >
                    {{ cat.emoji }} {{ cat.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Prioridade -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span class="text-lg">🎯</span>
                Prioridade
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  @click="editForm.priority = 'Low'"
                  :class="[
                    'py-3 px-2 rounded-xl font-medium text-sm transition-all border-2',
                    editForm.priority === 'Low'
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50',
                  ]"
                >
                  🌱 Baixa
                </button>
                <button
                  type="button"
                  @click="editForm.priority = 'Medium'"
                  :class="[
                    'py-3 px-2 rounded-xl font-medium text-sm transition-all border-2',
                    editForm.priority === 'Medium'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-lg scale-105'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50',
                  ]"
                >
                  ⚡ Média
                </button>
                <button
                  type="button"
                  @click="editForm.priority = 'High'"
                  :class="[
                    'py-3 px-2 rounded-xl font-medium text-sm transition-all border-2',
                    editForm.priority === 'High'
                      ? 'bg-red-500 text-white border-red-500 shadow-lg scale-105'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50',
                  ]"
                >
                  🔥 Alta
                </button>
              </div>
            </div>

            <!-- Botões -->
            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="showEditModal = false"
                class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="editLoading"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="editLoading" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span v-if="editLoading">Salvando...</span>
                <template v-else>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Salvar Alterações</span>
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { useAuthStore } from '@/stores/authStore'
import TaskForm from '@/components/TaskForm.vue'

const router = useRouter()
const taskStore = useTaskStore()
const authStore = useAuthStore()
const sortBy = ref('default')
const selectedCategory = ref(null)
const showDeleteModal = ref(false)
const taskToDelete = ref(null)
const showEditModal = ref(false)
const taskToEdit = ref(null)
const editLoading = ref(false)

// Formulário de edição
const editForm = ref({
  title: '',
  description: '',
  category: '',
  priority: 'Medium',
  isCompleted: false
})

// Categorias rápidas para edição
const quickEditCategories = [
  { name: 'Trabalho', emoji: '💼' },
  { name: 'Estudos', emoji: '📚' },
  { name: 'Pessoal', emoji: '👤' },
  { name: 'Saúde', emoji: '💪' },
  { name: 'Casa', emoji: '🏠' },
]

// Computed properties para informações do usuário
const userName = computed(() => authStore.currentUser?.name || authStore.currentUser?.email || 'Usuário')
const userInitial = computed(() => {
  const name = authStore.currentUser?.name || authStore.currentUser?.email || 'U'
  return name.charAt(0).toUpperCase()
})

// Função de logout
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  taskStore.fetchTasks()
})

// Computed property para categorias disponíveis
const availableCategories = computed(() => {
  const categories = taskStore.tasks
    .map(task => task.category)
    .filter(category => category && category.trim() !== '')
  return [...new Set(categories)].sort()
})

// Computed property para filtrar por categoria
const filteredTasks = computed(() => {
  if (!selectedCategory.value) {
    return taskStore.tasks
  }
  return taskStore.tasks.filter(task => task.category === selectedCategory.value)
})

// Computed property para ordenar as tarefas
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
  
  // default: ordem original (por data de criação)
  return tasks
})

// Mapeamento de categorias para emojis
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

const editTask = (task) => {
  taskToEdit.value = task
  editForm.value = {
    title: task.title,
    description: task.description || '',
    category: task.category || '',
    priority: task.priority,
    isCompleted: task.isCompleted
  }
  showEditModal.value = true
}

const saveEdit = async () => {
  if (!taskToEdit.value) return
  
  editLoading.value = true
  try {
    const updatedTask = {
      ...taskToEdit.value,
      ...editForm.value
    }
    
    await taskStore.updateTask(taskToEdit.value.id, updatedTask)
    showEditModal.value = false
    taskToEdit.value = null
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
  } finally {
    editLoading.value = false
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
