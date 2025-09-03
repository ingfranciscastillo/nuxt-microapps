<template>
  <div class="space-y-6">
    <!-- Timer display -->
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-48 h-48 bg-primary-100 dark:bg-primary-900/50 rounded-full">
        <span class="text-4xl font-mono font-bold text-primary-700 dark:text-primary-300">
          25:00
        </span>
      </div>
    </div>

    <!-- Estado actual -->
    <div class="text-center">
      <p class="text-lg font-medium text-gray-900 dark:text-white">
        Sesión de Trabajo
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Sesión 1 de 4
      </p>
    </div>

    <!-- Controles -->
    <div class="flex justify-center space-x-4">
      <button class="btn-primary">
        Iniciar
      </button>
      <button class="btn-secondary">
        Pausar
      </button>
      <button class="btn-secondary">
        Reiniciar
      </button>
    </div>

    <!-- Configuración -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 mb-1">
          Trabajo (min)
        </label>
        <input
          type="number"
          value="25"
          class="w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 mb-1">
          Descanso corto (min)
        </label>
        <input
          type="number"
          value="5"
          class="w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 mb-1">
          Descanso largo (min)
        </label>
        <input
          type="number"
          value="15"
          class="w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica del temporizador Pomodoro
</script>