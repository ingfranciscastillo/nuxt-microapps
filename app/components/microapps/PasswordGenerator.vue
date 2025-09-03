<template>
  <div class="space-y-6">
    <!-- Configuración -->
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Longitud: 12 caracteres
        </label>
        <input
          type="range"
          min="4"
          max="128"
          value="12"
          class="w-full"
        >
      </div>

      <div class="space-y-3">
        <div class="flex items-center">
          <input
            type="checkbox"
            id="uppercase"
            checked
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          >
          <label for="uppercase" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Mayúsculas (A-Z)
          </label>
        </div>
        
        <div class="flex items-center">
          <input
            type="checkbox"
            id="lowercase"
            checked
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          >
          <label for="lowercase" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Minúsculas (a-z)
          </label>
        </div>
        
        <div class="flex items-center">
          <input
            type="checkbox"
            id="numbers"
            checked
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          >
          <label for="numbers" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Números (0-9)
          </label>
        </div>
        
        <div class="flex items-center">
          <input
            type="checkbox"
            id="symbols"
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          >
          <label for="symbols" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Símbolos (!@#$%^&*)
          </label>
        </div>
      </div>
    </div>

    <!-- Contraseña generada -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div class="flex items-center space-x-2">
        <input
          type="text"
          value="Kj9#mN2pX4qZ"
          readonly
          class="flex-1 bg-transparent border-none focus:ring-0 font-mono text-lg"
        >
        <button class="btn-secondary">
          Copiar
        </button>
      </div>
    </div>

    <!-- Botón generar -->
    <button class="btn-primary w-full">
      Generar Nueva Contraseña
    </button>
  </div>
</template>

<script setup>
// Aquí irá la lógica del generador de contraseñas
</script>