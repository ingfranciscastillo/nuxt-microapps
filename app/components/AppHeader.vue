<template>
  <UCard class="sticky top-0 z-30 rounded-none border-b border-divider shadow-small">
    <div class="flex flex-row items-center justify-between px-6 py-4">
      <!-- Left side -->
      <div class="flex items-center gap-4">
        <!-- Mobile menu button -->
        <UButton
          variant="light"
          size="sm"
          isIconOnly="true"
          class="lg:hidden"
          @click="$emit('toggleSidebar')"
        >
          <Icon icon="ph:list-bold" class="h-5 w-5" />
        </UButton>

        <!-- Page title -->
        <div>
          <h1 class="text-lg font-semibold text-foreground">{{ pageTitle }}</h1>
          <p class="text-xs text-foreground-500">{{ pageSubtitle }}</p>
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <!-- Theme toggle -->
        <UButton
          variant="ghost"
          size="sm"
          isIconOnly
          @click="themeStore.toggleTheme()"
        >
          <Icon 
            :icon="themeStore.isDark ? 'ph:sun-bold' : 'ph:moon-bold'" 
            class="h-5 w-5" 
          />
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineEmits(['toggleSidebar'])

const route = useRoute()
const themeStore = useThemeStore()

// Títulos y subtítulos de páginas
const pageData = {
  '/': { title: 'Dashboard', subtitle: 'Bienvenido a tus micro-aplicaciones' },
  '/currency-converter': { title: 'Conversor de Divisas', subtitle: 'Convierte entre diferentes monedas' },
  '/unit-converter': { title: 'Conversor de Unidades', subtitle: 'Longitud, peso, temperatura y más' },
  '/bmi-calculator': { title: 'Calculadora IMC', subtitle: 'Calcula tu índice de masa corporal' },
  '/password-generator': { title: 'Generador de Contraseñas', subtitle: 'Crea contraseñas seguras' },
  '/pomodoro-timer': { title: 'Temporizador Pomodoro', subtitle: 'Gestiona tu tiempo productivamente' },
  '/meme-generator': { title: 'Generador de Memes', subtitle: 'Crea memes divertidos' },
  '/trivia-game': { title: 'Trivia Game', subtitle: 'Pon a prueba tus conocimientos' },
  '/todo-list': { title: 'Lista de Tareas', subtitle: 'Organiza tus pendientes' },
  '/sticky-notes': { title: 'Notas Rápidas', subtitle: 'Notas tipo post-it coloridas' },
  '/agenda': { title: 'Agenda Simple', subtitle: 'Gestiona tus eventos' },
  '/shopping-list': { title: 'Lista de Compras', subtitle: 'Organiza tus compras' },
  '/dictionary': { title: 'Diccionario', subtitle: 'Busca definiciones' }
}

const pageTitle = computed(() => {
  return pageData[route.path]?.title || 'Micro Apps Dashboard'
})

const pageSubtitle = computed(() => {
  return pageData[route.path]?.subtitle || 'Herramientas útiles para tu día a día'
})
</script>