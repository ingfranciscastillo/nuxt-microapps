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
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import Footer from './components/layout/Footer.vue'
</script>