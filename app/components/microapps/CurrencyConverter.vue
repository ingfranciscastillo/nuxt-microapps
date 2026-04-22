<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-sm font-medium text-foreground-700">Cantidad</label>
        <UInputNumber
          v-model="fromAmount"
          :min="0"
          :step="1"
          variant="outline"
          class="w-full"
          placeholder="1"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-foreground-700">De</label>
        <USelectMenu
          v-model="fromCurrency"
          :items="currencyItems"
          placeholder="Selecciona moneda"
          variant="outline"
          class="w-full"
          value-key="code"
        >
          <template #option="{ item }">
            <div class="flex items-center gap-2">
              <span class="text-lg">{{ item.flag }}</span>
              <span class="font-medium">{{ item.code }}</span>
              <span class="text-foreground-400 text-sm">{{ item.name }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>
    </div>

    <div class="flex justify-center">
      <UButton
        variant="soft"
        size="sm"
        icon="i-ph-arrows-left-right-bold"
        @click="swapCurrencies"
      >
        Intercambiar
      </UButton>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium text-foreground-700">A</label>
      <USelectMenu
        v-model="toCurrency"
        :items="currencyItems"
        placeholder="Selecciona moneda"
        variant="outline"
        class="w-full"
        value-key="code"
      >
        <template #option="{ item }">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ item.flag }}</span>
            <span class="font-medium">{{ item.code }}</span>
            <span class="text-foreground-400 text-sm">{{ item.name }}</span>
          </div>
        </template>
      </USelectMenu>
    </div>

    <UCard class="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
      <div class="text-center py-6">
        <UIcon name="i-ph-currency-dollar-bold" class="mx-auto size-8 text-primary mb-3" />
        <p class="text-sm text-foreground-500 mb-2">
          {{ fromAmount | number }} {{ fromCurrency }} =
        </p>
        <p class="text-4xl font-bold text-primary mb-2">
          {{ convertedAmount | number }} {{ toCurrency }}
        </p>
        <p class="text-xs text-foreground-400">
          1 {{ fromCurrency }} = {{ exchangeRate }} {{ toCurrency }}
        </p>
        <div class="flex gap-2 justify-center mt-4">
          <UButton
            variant="outline"
            size="sm"
            icon="i-ph-copy-bold"
            @click="copyResult"
          />
          <UButton
            variant="ghost"
            size="sm"
            icon="i-ph-clock-clockwise-bold"
            @click="showHistory = !showHistory"
          >
            Historial
          </UButton>
        </div>
      </div>
    </UCard>

    <Transition name="slide">
      <UCard v-if="showHistory" class="border border-foreground-200 dark:border-foreground-700">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold">Historial</h3>
            <UButton
              variant="ghost"
              size="sm"
              icon="i-ph-trash-bold"
              @click="clearHistory"
            />
          </div>
        </template>
        <div v-if="history.length === 0" class="py-8 text-center">
          <UIcon name="i-ph-clock-clockwise-bold" class="mx-auto size-10 text-foreground-300 mb-2" />
          <p class="text-sm text-foreground-400">Sin conversiones recientes</p>
        </div>
        <div v-else class="space-y-2 max-h-64 overflow-y-auto">
          <div
            v-for="(entry, index) in history"
            :key="index"
            class="flex items-center justify-between p-2 rounded-lg hover:bg-default-50 cursor-pointer transition-colors"
            @click="applyFromHistory(entry)"
          >
            <div class="flex items-center gap-2">
              <UIcon name="i-ph-arrows-left-right-bold" class="size-4 text-foreground-400" />
              <span class="text-sm">
                <span class="font-medium">{{ entry.fromAmount }}</span>
                <span class="text-foreground-400">{{ entry.from }}</span>
                <span class="mx-1">=</span>
                <span class="font-medium">{{ entry.toAmount }}</span>
                <span class="text-foreground-400">{{ entry.to }}</span>
              </span>
            </div>
            <span class="text-xs text-foreground-400">{{ formatDate(entry.timestamp) }}</span>
          </div>
        </div>
      </UCard>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
const {
  fromAmount,
  fromCurrency,
  toCurrency,
  exchangeRate,
  convertedAmount,
  allCurrencies,
  swapCurrencies,
  saveToHistory,
  clearHistory,
  applyFromHistory,
  showHistory,
  history,
  fetchRate
} = useCurrencyConverter()

const currencyItems = computed(() =>
  allCurrencies.value.map(c => ({
    code: c.code,
    flag: c.flag,
    name: c.name,
    symbol: c.symbol
  }))
)

const copyResult = async () => {
  const text = `${fromAmount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}`
  try {
    await navigator.clipboard.writeText(text)
    saveToHistory()
    toast.add({
      title: 'Copiado',
      description: text,
      color: 'success',
      icon: 'i-ph-check-circle-bold'
    })
  } catch {
    console.error('Error copying to clipboard')
  }
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

watch([fromAmount, fromCurrency, toCurrency], () => {
  if (convertedAmount.value) {
    saveToHistory()
  }
})

onMounted(() => {
  fetchRate()
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>