<template>
  <UDashboardSidebar collapsible resizable :min-size="22" :max-size="25">
    <template #header>
      <div class="flex items-center gap-3 px-2">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
          <UIcon name="i-ph-stack-bold" class="size-5 text-white" />
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold text-foreground">UtiliApp</span>
          <span class="text-[10px] text-foreground-500">Micro Apps</span>
        </div>
      </div>
    </template>
    
    <SidebarContent />
  </UDashboardSidebar>
</template>

<script setup lang="ts">
import SidebarContent from '~/components/SidebarContent.vue'
</script>

<style scoped>
:deep(.UDashboardSidebar) {
  background: linear-gradient(180deg, rgb(var(--color-surface)) 0%, rgb(var(--color-surface)/0.5) 100%);
  backdrop-filter: blur(12px);
}
</style>