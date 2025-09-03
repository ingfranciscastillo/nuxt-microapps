<template>
  <UCard>
    <div class="flex flex-col gap-6 p-6">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
          <Icon icon="ph:squares-four-bold" class="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-foreground">Micro Apps</h1>
          <p class="text-xs text-foreground-500">Dashboard</p>
        </div>
      </div>

      <Divider />

      <!-- Navegación principal -->
      <div class="space-y-2">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground-400">
          Dashboard
        </h2>
        
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="$route.path === '/' 
            ? 'bg-primary/10 text-primary' 
            : 'text-foreground-600 hover:bg-default-100 hover:text-foreground'"
        >
          <Icon icon="ph:house-bold" class="h-5 w-5" />
          Inicio
        </NuxtLink>
      </div>

      <!-- Navegación micro-apps -->
      <div class="flex-1 space-y-2">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground-400">
          Micro Apps
        </h2>
        
        <div class="space-y-1">
          <NuxtLink
            v-for="app in microApps"
            :key="app.href"
            :to="app.href"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            :class="$route.path === app.href 
              ? 'bg-primary/10 text-primary' 
              : 'text-foreground-600 hover:bg-default-100 hover:text-foreground'"
          >
            <Icon :icon="app.icon" class="h-5 w-5" />
            {{ app.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- Botón cerrar en móvil -->
      <UButton
        v-if="$emit"
        variant="ghost"
        size="sm"
        class="lg:hidden"
        @click="$emit('close')"
      >
        <Icon icon="ph:x-bold" class="h-4 w-4" />
        Cerrar menú
      </UButton>
    </div>
  </UCard>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineEmits(['close'])

// Lista de micro-aplicaciones
const microApps = [
  { name: 'Conversor de Divisas', href: '/currency-converter', icon: 'ph:currency-dollar-bold' },
  { name: 'Conversor de Unidades', href: '/unit-converter', icon: 'ph:scales-bold' },
  { name: 'Calculadora IMC', href: '/bmi-calculator', icon: 'ph:heart-bold' },
  { name: 'Generador de Contraseñas', href: '/password-generator', icon: 'ph:key-bold' },
  { name: 'Temporizador Pomodoro', href: '/pomodoro-timer', icon: 'ph:clock-bold' },
  { name: 'Generador de Memes', href: '/meme-generator', icon: 'ph:smiley-bold' },
  { name: 'Trivia Game', href: '/trivia-game', icon: 'ph:puzzle-piece-bold' },
  { name: 'Lista de Tareas', href: '/todo-list', icon: 'ph:list-bullets-bold' },
  { name: 'Notas Rápidas', href: '/sticky-notes', icon: 'ph:note-bold' },
  { name: 'Agenda Simple', href: '/agenda', icon: 'ph:calendar-bold' },
  { name: 'Lista de Compras', href: '/shopping-list', icon: 'ph:shopping-cart-bold' },
  { name: 'Diccionario', href: '/dictionary', icon: 'ph:book-open-bold' }
]
</script>