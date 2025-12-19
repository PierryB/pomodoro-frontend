import { ref } from 'vue'

const isDarkMode = ref(false)

export function useTheme() {
  const updateTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    updateTheme()
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    updateTheme()
  }

  return {
    isDarkMode,
    toggleTheme,
    initTheme,
  }
}

