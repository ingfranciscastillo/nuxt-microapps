<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <UIcon name="i-ph-key-bold" class="h-6 w-6 text-warning" />
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
        <PasswordGenerator />
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import PasswordGenerator from '~/components/microapps/PasswordGenerator.vue'

useHead({
  title: 'Generador de Contraseñas - Micro Apps'
})
</script>