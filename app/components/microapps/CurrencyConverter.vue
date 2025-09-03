<template>
  <div class="space-y-6">
    <!-- Formulario de conversión -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-small font-medium text-foreground-700">
          Cantidad y moneda de origen
        </label>
        <div class="flex gap-2">
          <UInput
            v-model="fromAmount"
            type="number"
            placeholder="100"
            variant="bordered"
            class="flex-1"
          />
          <USelect
            v-model="fromCurrency"
            placeholder="USD"
            variant="bordered"
            class="w-32"
          >
            <SelectItem key="USD">USD</SelectItem>
            <SelectItem key="EUR">EUR</SelectItem>
            <SelectItem key="GBP">GBP</SelectItem>
            <SelectItem key="JPY">JPY</SelectItem>
          </USelect>
        </div>
      </div>
      
      <div class="space-y-2">
        <label class="text-small font-medium text-foreground-700">
          Moneda de destino
        </label>
        <USelect
            v-model="toCurrency"
          placeholder="EUR"
          variant="bordered"
          
        >
          <SelectItem key="EUR">EUR</SelectItem>
          <SelectItem key="USD">USD</SelectItem>
          <SelectItem key="GBP">GBP</SelectItem>
          <SelectItem key="JPY">JPY</SelectItem>
        </USelect>
      </div>
    </div>

    <!-- Resultado -->
    <UCard class="bg-primary/5 border border-primary/20">
      <UContainer class="text-center py-8">
        <Icon icon="ph:currency-dollar-bold" class="mx-auto h-8 w-8 text-primary mb-2" />
        <p class="text-small text-foreground-600">Resultado</p>
        <p class="text-2xl font-bold text-primary mb-1">
          {{ convertedAmount }} {{ toCurrency }}
        </p>
        <p class="text-tiny text-foreground-400">
          Tasa: 1 {{ fromCurrency }} = {{ exchangeRate }} {{ toCurrency }}
        </p>
      </UContainer>
    </UCard>

    <!-- Botón convertir -->
    <UButton
      color="primary"
      size="lg"
      class="w-full"
      :isLoading="isLoading"
      @click="convertCurrency"
    >
      <Icon icon="ph:arrows-left-right-bold" class="w-4 h-4 mr-2" />
      Convertir
    </UButton>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

// Estados reactivos
const fromAmount = ref(100)
const fromCurrency = ref('USD')
const toCurrency = ref('EUR')
const convertedAmount = ref('85.50')
const exchangeRate = ref('0.855')
const isLoading = ref(false)

// Función de conversión (placeholder)
const convertCurrency = async () => {
  isLoading.value = true
  
  // Simular API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Aquí iría la lógica real con TanStack Query
  convertedAmount.value = (fromAmount.value * parseFloat(exchangeRate.value)).toFixed(2)
  
  isLoading.value = false
}
</script>