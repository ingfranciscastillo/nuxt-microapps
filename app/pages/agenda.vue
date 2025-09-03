<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10">
            <Icon icon="ph:heart-bold" class="h-6 w-6 text-danger" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Agenda Simple</h2>
            <p class="text-small text-foreground-500">
              Gestiona tus eventos
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente AgendaSimple -->
        <div class="text-center py-12">
          <Icon icon="ph:heart-bold" class="mx-auto h-16 w-16 text-danger/30 mb-4" />
          <p class="text-foreground-400">Componente agenda simple</p>
          <p class="text-small text-foreground-300">Componente agenda simple</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>


<script setup>
import { Icon } from '@iconify/vue'

useHead({
  title: 'Agenda Simple - Micro Apps'
})
</script>