<template>
  <div class="min-h-screen bg-background">
    <!-- Sidebar -->
    <AppSidebar 
      :is-open="sidebarOpen" 
      @close="sidebarOpen = false" 
    />
    
    <!-- Main content -->
    <div class="lg:pl-72">
      <!-- Header -->
      <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <!-- Page content -->
      <main class="p-6">
        <div class="mx-auto max-w-7xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '~/components/AppSidebar.vue'
import AppHeader from '~/components/AppHeader.vue'

// Estado del sidebar
const sidebarOpen = ref(false)
</script>