<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <Icon icon="ph:key-bold" class="h-6 w-6 text-warning" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Generador de Contraseñas</h2>
            <p class="text-small text-foreground-500">
              Genera contraseñas seguras con opciones personalizables
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente PasswordGenerator -->
        <div class="text-center py-12">
          <Icon icon="ph:key-bold" class="mx-auto h-16 w-16 text-warning/30 mb-4" />
          <p class="text-foreground-400">Componente generador de contraseñas</p>
          <p class="text-small text-foreground-300">Con opciones de longitud y caracteres</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

useHead({
  title: 'Generador de Contraseñas - Micro Apps'
})
</script>