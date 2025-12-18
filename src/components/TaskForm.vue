<template>
  <div
    class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-8"
  >
    <div class="flex items-center gap-2 mb-6">
      <div
        class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
      >
        <span class="text-2xl">✨</span>
      </div>
      <h2 class="text-2xl font-bold text-gray-800">Nova Tarefa</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <span class="text-lg">📝</span>
          Título *
        </label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-50 focus:bg-white"
          placeholder="Ex: Estudos"
        />
      </div>

      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <span class="text-lg">💭</span>
          Descrição
        </label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none bg-gray-50 focus:bg-white"
          placeholder="Detalhes sobre sua tarefa..."
        ></textarea>
      </div>

      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <span class="text-lg">🎯</span>
          Prioridade
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            @click="form.priority = 'Low'"
            :class="[
              'py-3 px-2 rounded-xl font-medium text-sm transition-all border-2',
              form.priority === 'Low'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105'
                : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50',
            ]"
          >
            🌱 Baixa
          </button>
          <button
            type="button"
            @click="form.priority = 'Medium'"
            :class="[
              'py-3 px-2 rounded-xl font-medium text-sm transition-all border-2',
              form.priority === 'Medium'
                ? 'bg-amber-500 text-white border-amber-500 shadow-lg scale-105'
                : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50',
            ]"
          >
            ⚡ Média
          </button>
          <button
            type="button"
            @click="form.priority = 'High'"
            :class="[
              'py-3 px-2 rounded-xl font-medium text-sm transition-all border-2',
              form.priority === 'High'
                ? 'bg-red-500 text-white border-red-500 shadow-lg scale-105'
                : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50',
            ]"
          >
            🔥 Alta
          </button>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <span
            class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          Criando...
        </span>
        <span v-else class="flex items-center justify-center gap-2">
          <span>➕</span>
          Criar Tarefa
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const loading = ref(false)

const form = ref({
  title: '',
  description: '',
  priority: 'Medium',
  isCompleted: false,
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await taskStore.createTask(form.value)
    // Limpar formulário
    form.value = {
      title: '',
      description: '',
      priority: 'Medium',
      isCompleted: false,
    }
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
  } finally {
    loading.value = false
  }
}
</script>
