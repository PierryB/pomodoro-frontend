<script setup>
import { onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import NotificationToast from '@/components/NotificationToast.vue'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/stores/authStore'

const { initTheme } = useTheme()
const authStore = useAuthStore()

const isInitializing = computed(() => authStore.initializing)

onMounted(async () => {
  initTheme()
  await authStore.initAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-primary flex flex-col page-enter">
    <!-- Loading inicial -->
    <div 
      v-if="isInitializing" 
      class="flex-1 flex flex-col items-center justify-center"
    >
      <div class="text-center">
        <!-- Logo/Ícone -->
        <div class="mb-6">
          <div class="w-20 h-20 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Spinner -->
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
          <div class="w-3 h-3 bg-emerald-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-3 h-3 bg-green-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
        
        <!-- Mensagem -->
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Verificando autenticação
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Aguarde um momento...
        </p>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <template v-else>
      <RouterView class="flex-1" />
      <AppFooter 
        githubUrl="https://github.com/PierryB"
        linkedinUrl="https://linkedin.com/in/pierryb"
        email="pierryboettscherdev@gmail.com"
      />
    </template>
    
    <NotificationToast />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  transition: color var(--transition-fast) var(--transition-timing);
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: var(--color-primary);
  font-weight: 600;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--spacing-2xl) * 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
