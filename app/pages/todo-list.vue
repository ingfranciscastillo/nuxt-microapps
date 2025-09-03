<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
            <UIcon name="ph:list-bullets-bold" class="h-6 w-6 text-violet-500" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Lista de Tareas</h2>
            <p class="text-small text-foreground-500">
              Organiza tus pendientes
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente TodoList -->
        <div class="text-center py-12">
          <UIcon name="ph:list-bullets-bold" class="mx-auto h-16 w-16 text-violet-500/30 mb-4" />
          <p class="text-foreground-400">Componente lista de tareas</p>
          <p class="text-small text-foreground-300">Componente lista de tareas</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>


<script setup>

useHead({
  title: 'Lista de Tareas - Micro Apps'
})
</script>