<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon icon="ph:smiley-bold" class="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Generador de Memes</h2>
            <p class="text-small text-foreground-500">
              Crea memes divertidos subiendo imágenes y agregando texto
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <MemeGenerator />
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import MemeGenerator from '~/components/microapps/meme-generator.vue'

useHead({
  title: 'Generador de Memes - Micro Apps'
})
</script>