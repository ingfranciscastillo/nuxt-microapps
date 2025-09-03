<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
            <UIcon name="ph:shopping-cart-bold" class="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Lista de Compras</h2>
            <p class="text-small text-foreground-500">
              Gestiona tu lista de compras
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <!-- Aquí irá el componente ShoppingList -->
        <div class="text-center py-12">
          <UIcon name="ph:shopping-cart-bold" class="mx-auto h-16 w-16 text-orange-500/30 mb-4" />
          <p class="text-foreground-400">Componente lista de compras</p>
          <p class="text-small text-foreground-300">Componente lista de compras</p>
        </div>
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>

useHead({
  title: 'Lista de Compras - Micro Apps'
})
</script>