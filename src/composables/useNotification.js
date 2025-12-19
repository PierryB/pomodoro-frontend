import { ref } from 'vue'

const notification = ref({
  show: false,
  message: '',
  type: 'info'
})

let timeoutId = null

export function useNotification() {
  const showNotification = (message, type = 'info', duration = 3000) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    notification.value = {
      show: true,
      message,
      type
    }

    timeoutId = setTimeout(() => {
      notification.value.show = false
    }, duration)
  }

  const hideNotification = () => {
    notification.value.show = false
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return {
    notification,
    showNotification,
    hideNotification
  }
}

