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
        <CurrencyConverter />
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import CurrencyConverter from '~/components/microapps/CurrencyConverter.vue'

useHead({
  title: 'Conversor de Divisas - UtiliApp'
})
</script>