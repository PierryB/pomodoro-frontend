<template>
  <div
    class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-8"
  >
    <div class="flex items-center gap-2 mb-6">
      <div
        class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center"
      >
        <ClipboardDocumentListIcon class="w-6 h-6 text-white" />
      </div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Nova Tarefa</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
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

      <div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          <span class="text-lg">🏷️</span>
          Categoria
        </label>
        <div class="space-y-3">
          <input
            v-model="form.category"
            type="text"
            list="categories"
            class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-1 focus:ring-green-500/30 focus:border-green-500 outline-none bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
            style="transition: box-shadow 200ms;"
            placeholder="Ex: Trabalho, Estudos, Pessoal..."
          />
          <datalist id="categories">
            <option value="Trabalho"></option>
            <option value="Estudos"></option>
            <option value="Pessoal"></option>
            <option value="Saúde"></option>
            <option value="Financeiro"></option>
            <option value="Casa"></option>
            <option value="Lazer"></option>
            <option value="Família"></option>
          </datalist>
          
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

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        style="transition: box-shadow 200ms, opacity 200ms;"
      >
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <span
            class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          Criando...
        </span>
        <span v-else class="flex items-center justify-center gap-2">
          <span>+</span>
          Criar Tarefa
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

const taskStore = useTaskStore()
const loading = ref(false)

const quickCategories = [
  { name: 'Trabalho', emoji: '💼' },
  { name: 'Estudos', emoji: '📚' },
  { name: 'Pessoal', emoji: '👤' },
  { name: 'Saúde', emoji: '💪' },
  { name: 'Casa', emoji: '🏠' },
]

const form = ref({
  title: '',
  description: '',
  category: '',
  priority: 'Medium',
  isCompleted: false,
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await taskStore.createTask(form.value)
    form.value = {
      title: '',
      description: '',
      category: '',
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
