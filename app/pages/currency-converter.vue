<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon icon="ph:currency-dollar-bold" class="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Conversor de Divisas</h2>
            <p class="text-small text-foreground-500">
              Convierte entre diferentes monedas usando tasas de cambio en tiempo real
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente CurrencyConverter -->
        <div class="text-center py-12">
          <Icon icon="ph:currency-dollar-bold" class="mx-auto h-16 w-16 text-primary/30 mb-4" />
          <p class="text-foreground-400">Componente de conversor de divisas</p>
          <p class="text-small text-foreground-300">Próximamente con TanStack Query</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

useHead({
  title: 'Calculadora IMC - Micro Apps'
})
</script>