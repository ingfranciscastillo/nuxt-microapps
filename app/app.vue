<template>
  <UApp>
    <UDashboardPanel>
      <template #header>
        <AppHeader />
      </template>
      <template #content>
        <NuxtPage />
      </template>
    </UDashboardPanel>
    
  </UApp>
</template>

<script setup>
import { useThemeStore } from './stores/theme'
import AppHeader from './components/AppHeader.vue'

// Inicializar tema
const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initTheme()
})
</script>

<style scoped>
  main {
    font-family: 'Inter', system-ui, sans-serif;
  }
</style>