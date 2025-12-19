<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform"
          style="transition: transform 300ms, opacity 300ms;"
          @click.stop
        >
          <!-- Ícone -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
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
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Excluir Tarefa?</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Tem certeza que deseja excluir "<span class="font-semibold">{{ task?.title }}</span>"?
              Esta ação não pode ser desfeita.
            </p>
          </div>

          <!-- Botões -->
          <div class="flex gap-3">
            <button
              @click="closeModal"
              :disabled="loading"
              class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              style="transition: opacity 200ms, transform 200ms;"
            >
              Cancelar
            </button>
            <button
              @click="handleDelete"
              :disabled="loading"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style="transition: box-shadow 200ms, transform 200ms, opacity 200ms;"
            >
              <span v-if="loading" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span v-if="loading">Excluindo...</span>
              <template v-else>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Excluir</span>
              </template>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
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
const emit = defineEmits(['close', 'deleted'])

// Store
const taskStore = useTaskStore()

// State
const loading = ref(false)

// Methods
const closeModal = () => {
  if (!loading.value) {
    emit('close')
  }
}

const handleDelete = async () => {
  if (!props.task) return
  
  loading.value = true
  try {
    await taskStore.deleteTask(props.task.id)
    emit('deleted')
    closeModal()
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
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

