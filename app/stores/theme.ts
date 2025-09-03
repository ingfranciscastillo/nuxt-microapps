import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme')
      if (saved) {
        isDark.value = saved === 'dark'
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      updateTheme()
    }
  }

  const updateTheme = () => {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  return {
    isDark: readonly(isDark),
    initTheme,
    toggleTheme
  }
})