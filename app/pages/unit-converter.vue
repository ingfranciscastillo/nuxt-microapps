<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
            <UIcon name="i-ph-scales-bold" class="h-6 w-6 text-secondary" />
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
        <UnitConverter />
      </UContainer>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import UnitConverter from '~/components/microapps/UnitConverter.vue'

useHead({
  title: 'Conversor de Unidades - UtiliApp'
})
</script>