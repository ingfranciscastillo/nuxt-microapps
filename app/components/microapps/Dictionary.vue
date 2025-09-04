<template>
  <div class="space-y-6">
    <div class="flex gap-2">
      <UInput
        v-model="searchTerm"
        icon="i-lucide-search"
        placeholder="Busca una palabra..."
        class="w-full"
        variant="outline"
        size="xl"
      />
      <UButton size="xl" @click="fetchDefinition">Buscar</UButton>
    </div>

    <UCard class="bg-primary/5 border border-primary/20">
      <UContainer class="text-center py-8">
        <Icon icon="ph:book-open-bold" class="mx-auto h-8 w-8 text-primary mb-2" />
        <p class="text-small text-foreground-600">Resultado</p>
        <p class="text-2xl font-bold text-primary mb-1">
          {{ definition }}
        </p>
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const definition = ref('')
const searchTerm = ref('')

const fetchDefinition = async () => {
  const response = await $fetch(`/api/dictionary`, {
    query: {
      searchTerm: searchTerm.value
    }
  })
  console.log(response)
  return response
}
</script>