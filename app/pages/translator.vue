<template>
  <div>
    <UContainer>
      <div class="py-8">
        <div class="text-center mb-8">
          <Icon icon="ph:translate-bold" class="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 class="text-3xl font-bold text-primary mb-2">Traductor</h1>
          <p class="text-muted-foreground">Traduce texto entre múltiples idiomas</p>
        </div>
        
        <Translator />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Translator from '~/components/microapps/Translator.vue'

// Meta tags
useHead({
  title: 'Traductor - MicroApps',
  meta: [
    { name: 'description', content: 'Traduce texto entre múltiples idiomas de forma rápida y precisa' }
  ]
})
</script>
