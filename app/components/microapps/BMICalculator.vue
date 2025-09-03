<template>
  <div class="space-y-6">
    <!-- Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Peso (kg)
        </label>
        <input
          type="number"
          placeholder="70"
          class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Altura (cm)
        </label>
        <input
          type="number"
          placeholder="175"
          class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
      </div>
    </div>

    <!-- Resultado -->
    <div class="bg-green-50 dark:bg-green-900/50 rounded-lg p-4">
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Tu IMC es</p>
        <p class="text-3xl font-bold text-green-700 dark:text-green-300">
          22.9
        </p>
        <p class="text-sm text-green-600 dark:text-green-400 mt-1">
          Peso normal
        </p>
      </div>
    </div>

    <!-- Rangos informativos -->
    <div class="text-sm space-y-2">
      <h4 class="font-medium text-gray-900 dark:text-white">Rangos de IMC:</h4>
      <div class="space-y-1 text-gray-600 dark:text-gray-400">
        <p>• Bajo peso: &lt; 18.5</p>
        <p>• Peso normal: 18.5 - 24.9</p>
        <p>• Sobrepeso: 25 - 29.9</p>
        <p>• Obesidad: ≥ 30</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica de la calculadora IMC
</script>