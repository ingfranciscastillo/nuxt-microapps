<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
            <UIcon name="ph:heart-bold" class="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Calculadora de IMC</h2>
            <p class="text-small text-foreground-500">
              Calcula tu índice de masa corporal y conoce tu estado de salud
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <BMICalculator />
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import BMICalculator from '~/components/microapps/BMICalculator.vue'

useHead({
  title: 'Calculadora IMC - Micro Apps'
})
</script>