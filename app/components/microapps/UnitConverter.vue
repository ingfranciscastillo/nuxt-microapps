<template>
  <div class="space-y-6">
    <UTabs v-model="selectedTypeIndex" :items="tabsItems" :ui="{ wrapper: 'justify-start' }" @change="selectType" />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-4">
        <label class="text-sm font-medium text-foreground-700">De</label>
        <div class="flex gap-2">
          <UInputNumber
            v-model="fromValue"
            :min="0"
            :step="1"
            variant="outline"
            class="flex-1"
            placeholder="0"
            @update:model-value="saveToHistory"
          />
          <USelectMenu
            v-model="fromUnit"
            :items="unitsItems"
            variant="outline"
            class="w-36"
            value-key="key"
          />
        </div>
      </div>

      <div class="flex items-center justify-center lg:justify-start lg:pt-6">
        <UButton
          variant="soft"
          size="sm"
          icon="i-ph-arrows-left-right-bold"
          @click="swapUnits"
        />
      </div>

      <div class="space-y-4">
        <label class="text-sm font-medium text-foreground-700">A</label>
        <div class="flex gap-2">
          <UInput
            :model-value="formattedResult"
            readonly
            variant="outline"
            class="flex-1 bg-default-50"
            placeholder="0"
          />
          <USelectMenu
            v-model="toUnit"
            :items="unitsItems"
            variant="outline"
            class="w-36"
            value-key="key"
          />
        </div>
      </div>
    </div>

    <UCard class="bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20">
      <div class="text-center py-6">
        <UIcon :name="selectedType.icon" class="mx-auto size-8 text-secondary mb-3" />
        <p class="text-2xl font-bold text-secondary mb-1">
          {{ fromValue || 0 }} {{ fromUnitSymbol }} =
        </p>
        <p class="text-3xl font-bold text-foreground">
          {{ formattedResult || 0 }} {{ toUnitSymbol }}
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
            <h3 class="text-sm font-semibold">Historial de conversiones</h3>
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
                <span class="font-medium">{{ entry.fromValue }}</span>
                <span class="text-foreground-400">{{ entry.from }}</span>
                <span class="mx-1">=</span>
                <span class="font-medium">{{ entry.toValue }}</span>
                <span class="text-foreground-400">{{ entry.to }}</span>
              </span>
            </div>
            <span class="text-xs text-foreground-400">{{ entry.type }}</span>
          </div>
        </div>
      </UCard>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
const {
  conversionTypes,
  selectedTypeIndex,
  selectedType,
  fromValue,
  fromUnit,
  toUnit,
  availableUnits,
  formattedResult,
  swapUnits,
  selectType,
  saveToHistory,
  clearHistory,
  applyFromHistory,
  showHistory,
  history
} = useUnitConverter()

const tabsItems = computed(() =>
  conversionTypes.value.map(type => ({
    label: type.label,
    icon: type.icon
  }))
)

const unitsItems = computed(() =>
  availableUnits.value.map(unit => ({
    label: `${unit.label} (${unit.symbol})`,
    key: unit.key,
    value: unit.key
  }))
)

const fromUnitSymbol = computed(() => {
  const unit = availableUnits.value.find(u => u.key === fromUnit.value)
  return unit?.symbol || fromUnit.value
})

const toUnitSymbol = computed(() => {
  const unit = availableUnits.value.find(u => u.key === toUnit.value)
  return unit?.symbol || toUnit.value
})

const copyResult = async () => {
  const text = `${fromValue.value || 0} ${fromUnitSymbol.value} = ${formattedResult.value} ${toUnitSymbol.value}`
  try {
    await navigator.clipboard.writeText(text)
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