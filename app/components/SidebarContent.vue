<template>
  <div class="flex flex-col h-full">
    <div class="px-3 py-4">
      <UInput
        v-model="searchQuery"
        placeholder="Buscar app..."
        variant="soft"
        size="sm"
        icon="i-ph-magnifying-glass-bold"
        @keydown.escape="searchQuery = ''"
      />
    </div>

    <nav class="flex-1 overflow-y-auto px-3 space-y-6">
      <template v-for="(group, groupIndex) in filteredGroups" :key="groupIndex">
        <div class="space-y-1">
          <div class="flex items-center gap-2 px-3 py-2">
            <UIcon :name="group.icon" class="size-4 text-primary" />
            <span class="text-xs font-semibold uppercase tracking-wider text-foreground-500">{{ group.label }}</span>
          </div>
          
          <UNavigationMenu
            orientation="vertical"
            :items="group.items"
            class="-mx-1.5"
          />
        </div>
      </template>

      <div v-if="filteredGroups.length === 0" class="py-8 text-center">
        <UIcon name="i-ph-smiley-sad-bold" class="mx-auto size-10 text-foreground-300 mb-2" />
        <p class="text-sm text-foreground-400">No se encontraron apps</p>
      </div>
    </nav>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

const groups = [
  {
    label: 'Inicio',
    icon: 'i-ph-house-bold',
    items: [
      { label: 'Inicio', icon: 'i-ph-house-bold', to: '/' }
    ]
  },
  {
    label: 'Finanzas',
    icon: 'i-ph-currency-dollar-bold',
    items: [
      { label: 'Conversor de Divisas', icon: 'i-ph-currency-dollar-bold', to: '/currency-converter' }
    ]
  },
  {
    label: 'Utilidades',
    icon: 'i-ph-scales-bold',
    items: [
      { label: 'Conversor de Unidades', icon: 'i-ph-scales-bold', to: '/unit-converter' },
      { label: 'Traductor', icon: 'i-ph-translate-bold', to: '/translator' }
    ]
  },
  {
    label: 'Salud',
    icon: 'i-ph-heart-bold',
    items: [
      { label: 'Calculadora IMC', icon: 'i-ph-heart-bold', to: '/bmi-calculator' }
    ]
  },
  {
    label: 'Seguridad',
    icon: 'i-ph-key-bold',
    items: [
      { label: 'Generador de Contraseñas', icon: 'i-ph-key-bold', to: '/password-generator' }
    ]
  },
  {
    label: 'Productividad',
    icon: 'i-ph-clock-bold',
    items: [
      { label: 'Temporizador Pomodoro', icon: 'i-ph-clock-bold', to: '/pomodoro-timer' },
      { label: 'Lista de Tareas', icon: 'i-ph-list-bullets-bold', to: '/todo-list' },
      { label: 'Notas Rápidas', icon: 'i-ph-note-bold', to: '/sticky-notes' }
    ]
  },
  {
    label: 'Entretenimiento',
    icon: 'i-ph-smiley-bold',
    items: [
      { label: 'Generador de Memes', icon: 'i-ph-smiley-bold', to: '/meme-generator' },
      { label: 'Trivia Game', icon: 'i-ph-puzzle-piece-bold', to: '/trivia-game' }
    ]
  },
  {
    label: 'Organización',
    icon: 'i-ph-calendar-bold',
    items: [
      { label: 'Agenda Simple', icon: 'i-ph-calendar-bold', to: '/agenda' },
      { label: 'Lista de Compras', icon: 'i-ph-shopping-cart-bold', to: '/shopping-list' }
    ]
  },
  {
    label: 'Educación',
    icon: 'i-ph-book-open-bold',
    items: [
      { label: 'Diccionario', icon: 'i-ph-book-open-bold', to: '/dictionary' }
    ]
  }
]

const filteredGroups = computed(() => {
  if (!searchQuery.value.trim()) {
    return groups
  }
  
  const query = searchQuery.value.toLowerCase()
  return groups
    .map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.label.toLowerCase().includes(query)
      )
    }))
    .filter(group => group.items.length > 0)
})
</script>

<style scoped>
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgb(var(--color-foreground-100));
  border-radius: 4px;
}

.dark nav::-webkit-scrollbar-thumb {
  background: rgb(var(--color-foreground-800));
}
</style>