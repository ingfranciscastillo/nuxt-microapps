<template>
  <UContainer class="space-y-6">
    <!-- Selector de tipo de conversión -->
    <div class="space-y-2">
      <label class="text-small font-medium text-foreground-700">
        Tipo de conversión
      </label>
      <USelect
      v-model="conversionType"
        placeholder="Selecciona el tipo"
        variant="bordered"
        @change="updateUnits"
      >
        <SelectItem key="length">Longitud</SelectItem>
        <SelectItem key="weight">Peso</SelectItem>
        <SelectItem key="temperature">Temperatura</SelectItem>
        <SelectItem key="speed">Velocidad</SelectItem>
      </USelect>
    </div>

    <!-- Conversión -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-small font-medium text-foreground-700">De</label>
        <div class="flex gap-2">
          <UInput
          v-model="fromValue"
            type="number"
            placeholder="1"
            variant="bordered"
            class="flex-1"
            
            @input="convert"
          />
          <USelect
          v-model="fromUnit"
            variant="bordered"
            class="w-40"
            
            @change="convert"
          >
            <SelectItem v-for="unit in availableUnits" :key="unit.key">
              {{ unit.label }}
            </SelectItem>
          </USelect>
        </div>
      </div>
      
      <div class="space-y-2">
        <label class="text-small font-medium text-foreground-700">A</label>
        <div class="flex gap-2">
          <UInput
            type="number"
            :value="toValue"
            readonly
            variant="bordered"
            class="flex-1 bg-default-50"
          />
          <USelect
          v-model="toUnit"
            variant="bordered"
            class="w-40"
            
            @change="convert"
          >
            <SelectItem v-for="unit in availableUnits" :key="unit.key">
              {{ unit.label }}
            </SelectItem>
          </USelect>
        </div>
      </div>
    </div>

    <!-- Resultado destacado -->
    <UCard class="bg-secondary/5 border border-secondary/20">
      <UContainer class="text-center py-6">
        <Icon icon="ph:scales-bold" class="mx-auto h-6 w-6 text-secondary mb-2" />
        <p class="text-lg">
          <span class="font-bold">{{ fromValue }} {{ fromUnit }}</span> = 
          <span class="font-bold text-secondary"> {{ toValue }} {{ toUnit }}</span>
        </p>
      </UContainer>
    </UCard>
  </UContainer>
</template>

<script setup>
import { Icon } from '@iconify/vue'

// Estados reactivos
const conversionType = ref('length')
const fromValue = ref(1)
const toValue = ref('1000')
const fromUnit = ref('m')
const toUnit = ref('cm')

// Unidades disponibles por tipo
const unitTypes = {
  length: [
    { key: 'mm', label: 'Milímetros' },
    { key: 'cm', label: 'Centímetros' },
    { key: 'm', label: 'Metros' },
    { key: 'km', label: 'Kilómetros' },
    { key: 'in', label: 'Pulgadas' },
    { key: 'ft', label: 'Pies' },
    { key: 'mi', label: 'Millas' }
  ],
  weight: [
    { key: 'g', label: 'Gramos' },
    { key: 'kg', label: 'Kilogramos' },
    { key: 'lb', label: 'Libras' },
    { key: 'oz', label: 'Onzas' }
  ],
  temperature: [
    { key: 'c', label: 'Celsius' },
    { key: 'f', label: 'Fahrenheit' },
    { key: 'k', label: 'Kelvin' }
  ],
  speed: [
    { key: 'kmh', label: 'km/h' },
    { key: 'mph', label: 'mph' },
    { key: 'ms', label: 'm/s' }
  ]
}

const availableUnits = computed(() => unitTypes[conversionType.value] || [])

// Actualizar unidades cuando cambia el tipo
const updateUnits = () => {
  const units = availableUnits.value
  if (units.length > 0) {
    fromUnit.value = units[0].key
    toUnit.value = units[1]?.key || units[0].key
    convert()
  }
}

// Función de conversión (placeholder)
const convert = () => {
  // Aquí iría la lógica real de conversión
  if (conversionType.value === 'length' && fromUnit.value === 'm' && toUnit.value === 'cm') {
    toValue.value = (fromValue.value * 100).toString()
  } else {
    toValue.value = (fromValue.value * 1.5).toFixed(2).toString() // Placeholder
  }
}
</script>