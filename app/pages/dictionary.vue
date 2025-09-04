<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <UIcon name="ph:book-open-bold" class="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Diccionario</h2>
            <p class="text-small text-foreground-500">
              Busca definiciones al instante
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <Dictionary />
      </UContainer>
    </UCard>
  </div>
</template>


<script setup>
import Dictionary from '~/components/microapps/Dictionary.vue'

useHead({
  title: 'Diccionario - Micro Apps'
})
</script>