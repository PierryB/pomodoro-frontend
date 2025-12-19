<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm overflow-y-auto"
        @click.self="closeModal"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 transform my-8"
          style="transition: transform 300ms, opacity 300ms;"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Editar Tarefa</h3>
            </div>
            <button
              @click="closeModal"
              class="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              style="transition: transform 200ms, opacity 200ms;"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Título -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span class="text-lg">📝</span>
                Título *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-1 focus:ring-green-500/30 focus:border-green-500 outline-none bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                style="transition: box-shadow 200ms;"
                placeholder="Ex: Estudos"
              />
            </div>

            <!-- Descrição -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span class="text-lg">💭</span>
                Descrição
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-1 focus:ring-green-500/30 focus:border-green-500 outline-none resize-none bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                style="transition: box-shadow 200ms;"
                placeholder="Detalhes sobre sua tarefa..."
              ></textarea>
            </div>

            <!-- Categoria -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span class="text-lg">🏷️</span>
                Categoria
              </label>
              <div class="space-y-3">
                <input
                  v-model="form.category"
                  type="text"
                  list="edit-categories"
                  class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-1 focus:ring-green-500/30 focus:border-green-500 outline-none bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                  style="transition: box-shadow 200ms;"
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
                    v-for="cat in quickCategories"
                    :key="cat.name"
                    type="button"
                    @click="form.category = cat.name"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-xs font-medium border-2',
                      form.category === cat.name
                        ? 'bg-green-500 text-white border-green-500 shadow-md'
                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20'
                    ]"
                  >
                    {{ cat.emoji }} {{ cat.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Prioridade -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span class="text-lg">🎯</span>
                Prioridade *
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  @click="form.priority = 'Low'"
                  :class="[
                    'py-3 px-2 rounded-xl font-medium text-sm border-2',
                    form.priority === 'Low'
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
                  ]"
                >
                  🌱 Baixa
                </button>
                <button
                  type="button"
                  @click="form.priority = 'Medium'"
                  :class="[
                    'py-3 px-2 rounded-xl font-medium text-sm border-2',
                    form.priority === 'Medium'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20',
                  ]"
                >
                  ⚡ Média
                </button>
                <button
                  type="button"
                  @click="form.priority = 'High'"
                  :class="[
                    'py-3 px-2 rounded-xl font-medium text-sm border-2',
                    form.priority === 'High'
                      ? 'bg-red-500 text-white border-red-500 shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20',
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
                @click="closeModal"
                class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600"
                style="transition: opacity 200ms, transform 200ms;"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style="transition: box-shadow 200ms, transform 200ms, opacity 200ms;"
              >
                <span v-if="loading" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span v-if="loading">Salvando...</span>
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
import { ref, watch } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  task: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close', 'saved'])

// Store
const taskStore = useTaskStore()

// State
const loading = ref(false)

// Categorias rápidas
const quickCategories = [
  { name: 'Trabalho', emoji: '💼' },
  { name: 'Estudos', emoji: '📚' },
  { name: 'Pessoal', emoji: '👤' },
  { name: 'Saúde', emoji: '💪' },
  { name: 'Casa', emoji: '🏠' },
]

// Form data
const form = ref({
  title: '',
  description: '',
  category: '',
  priority: 'Medium',
  isCompleted: false
})

// Watch para atualizar o form quando a task mudar
watch(() => props.task, (newTask) => {
  if (newTask) {
    form.value = {
      title: newTask.title,
      description: newTask.description || '',
      category: newTask.category || '',
      priority: newTask.priority,
      isCompleted: newTask.isCompleted
    }
  }
}, { immediate: true })

// Methods
const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  if (!props.task) return
  
  loading.value = true
  try {
    const updatedTask = {
      ...props.task,
      ...form.value
    }
    
    await taskStore.updateTask(props.task.id, updatedTask)
    emit('saved')
    closeModal()
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
  } finally {
    loading.value = false
  }
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

.modal-enter-active > div,
.modal-leave-active > div {
  transition: all 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}
</style>

