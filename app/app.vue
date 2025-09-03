<template>
  <UApp>
    <UDashboardGroup>
      <AppSidebar />
      <UDashboardPanel>
        <template #header>
          <AppHeader />
        </template>
        <template #body>
          <NuxtPage />
        </template>
        <template #footer>
          <Footer />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </UApp>
</template>

<script setup>
import { useThemeStore } from './stores/theme'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import Footer from './components/layout/Footer.vue'

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