<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
            <Icon icon="ph:scales-bold" class="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Conversor de Unidades</h2>
            <p class="text-small text-foreground-500">
              Convierte entre diferentes unidades de medida
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente UnitConverter -->
        <div class="text-center py-12">
          <Icon icon="ph:scales-bold" class="mx-auto h-16 w-16 text-secondary/30 mb-4" />
          <p class="text-foreground-400">Componente de conversor de unidades</p>
          <p class="text-small text-foreground-300">Longitud, peso, temperatura y más</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

useHead({
  title: 'Conversor de Unidades - Micro Apps'
})
</script>