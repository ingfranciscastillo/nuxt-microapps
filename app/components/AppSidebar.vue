<template>
  <div class="relative">
    <!-- Overlay móvil -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="$emit('close')"
    />

    <!-- Sidebar móvil -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 transform transition-transform lg:hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <SidebarContent @close="$emit('close')" />
    </div>

    <!-- Sidebar desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <SidebarContent />
    </div>
  </div>
</template>

<script setup>
import SidebarContent from '~/components/SidebarContent.vue'

defineProps(['isOpen'])
defineEmits(['close'])
</script>