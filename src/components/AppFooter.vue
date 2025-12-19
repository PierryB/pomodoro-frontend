<template>
  <footer class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center gap-6">
         <div class="flex items-center gap-3">
           <ClipboardDocumentListIcon class="w-8 h-8 text-white" />
           <span class="text-2xl font-bold">Taskfy</span>
         </div>

        <p class="text-green-100 text-center max-w-md">
          Organize suas tarefas com estilo e produtividade
        </p>

         <div class="flex flex-wrap items-center justify-center gap-4">
           <a
             :href="props.githubUrl"
             target="_blank"
             rel="noopener noreferrer"
             class="group flex items-center gap-3 px-5 py-3 hover:bg-white/20 rounded-lg transform hover:scale-105 text-white hover:text-white"
             style="transition: transform 300ms, opacity 300ms;"
             title="GitHub"
           >
             <GithubIcon class="w-6 h-6 text-white" />
             <span class="text-base font-semibold">GitHub</span>
           </a>

           <a
             :href="props.linkedinUrl"
             target="_blank"
             rel="noopener noreferrer"
             class="group flex items-center gap-3 px-5 py-3 hover:bg-white/20 rounded-lg transform hover:scale-105 text-white hover:text-white"
             style="transition: transform 300ms, opacity 300ms;"
             title="LinkedIn"
           >
             <LinkedinIcon class="w-6 h-6 text-white" />
             <span class="text-base font-semibold">LinkedIn</span>
           </a>

           <a
             :href="`mailto:${props.email}`"
             class="group flex items-center gap-3 px-5 py-3 hover:bg-white/20 rounded-lg transform hover:scale-105 text-white hover:text-white"
             style="transition: transform 300ms, opacity 300ms;"
             title="E-mail"
           >
             <EnvelopeIcon class="w-6 h-6 text-white" />
             <span class="text-base font-semibold">E-mail</span>
           </a>
         </div>

        <div class="w-full max-w-md h-px bg-white/20"></div>

         <div class="text-center text-white text-base">
           <p>© {{ currentYear }} Taskfy. Desenvolvido por Pierry Boettscher em Vue.js</p>
         </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { ClipboardDocumentListIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'

const props = defineProps({
  githubUrl: {
    type: String,
    default: 'https://github.com/seu-usuario'
  },
  linkedinUrl: {
    type: String,
    default: 'https://linkedin.com/in/seu-perfil'
  },
  email: {
    type: String,
    default: 'seu-email@exemplo.com'
  }
})

// Ano atual
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
footer {
  flex-shrink: 0;
}
</style>

