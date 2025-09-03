<template>
  <UDashboardNavbar :title="pageTitle">

      <div class="flex items-center gap-4">
        <!-- Mobile menu button -->
        <UButton
          variant="light"
          size="sm"
          icon="ph:list-bold"
          class="lg:hidden"
          @click="$emit('toggleSidebar')"
        />
      </div>


      <template #right>
        <UButton
          variant="ghost"
          size="sm"
          :icon="themeStore.isDark ? 'ph:sun-bold' : 'ph:moon-bold'"
            @click="themeStore.toggleTheme()"
          />
      </template>

  </UDashboardNavbar>
</template>

<script setup>

defineEmits(['toggleSidebar'])

const route = useRoute()
const themeStore = useThemeStore()

// Títulos y subtítulos de páginas
const pageData = {
  '/': { title: 'Micro Apps', subtitle: 'Bienvenido a tus micro-aplicaciones' },
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
  return pageData[route.path]?.title || 'Micro Apps'
})
</script>