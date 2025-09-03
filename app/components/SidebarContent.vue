<template>
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

    <USeparator/>

    <NuxtLink
      v-for="app in microApps"
      :key="app.href"
      :to="app.href"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
      :class="$route.path === app.href 
      ? 'bg-primary/10 text-primary' 
      : 'text-foreground-600 hover:bg-default-100 hover:text-foreground'"
    >
      <UIcon :name="app.icon" class="size-6" />
      {{ app.name }}
    </NuxtLink>
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