<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
            <UIcon name="ph:note-bold" class="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Notas Rápidas</h2>
            <p class="text-small text-foreground-500">
              Crea notas rápidas y accede a ellas fácilmente
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente StickyNotes -->
        <div class="text-center py-12">
          <UIcon name="ph:note-bold" class="mx-auto h-16 w-16 text-yellow-400/30 mb-4" />
          <p class="text-foreground-400">Componente notas rápidas</p>
          <p class="text-small text-foreground-300">Componente notas rápidas</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>


<script setup>

useHead({
  title: 'Notas Rápidas - Micro Apps'
})
</script>