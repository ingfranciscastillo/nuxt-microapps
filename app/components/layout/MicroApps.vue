<script setup>
    const microApps = ref([
  { 
    title: 'Conversor de Divisas', 
    to: '/currency-converter', 
    icon: 'i-ph-currency-dollar-bold',
    description: 'Convierte entre diferentes monedas con tasas actualizadas',
    category: 'Finanzas'
  },
  { 
    title: 'Conversor de Unidades', 
    to: '/unit-converter', 
    icon: 'i-ph-scales-bold',
    description: 'Longitud, peso, temperatura y velocidad',
    category: 'Utilidades'
  },
  { 
    title: 'Calculadora IMC', 
    to: '/bmi-calculator', 
    icon: 'i-ph-heart-bold',
    description: 'Calcula tu índice de masa corporal',
    category: 'Salud'
  },
  { 
    title: 'Generador de Contraseñas', 
    to: '/password-generator', 
    icon: 'i-ph-key-bold',
    description: 'Crea contraseñas seguras personalizables',
    category: 'Seguridad'
  },
  { 
    title: 'Temporizador Pomodoro', 
    to: '/pomodoro-timer', 
    icon: 'i-ph-clock-bold',
    description: 'Gestiona tu tiempo productivamente',
    category: 'Productividad'
  },
  { 
    title: 'Generador de Memes', 
    to: '/meme-generator', 
    icon: 'i-ph-smiley-bold',
    description: 'Crea memes divertidos fácilmente',
    category: 'Entretenimiento'
  },
  { 
    title: 'Trivia Game', 
    to: '/trivia-game', 
    icon: 'i-ph-puzzle-piece-bold',
    description: 'Pon a prueba tus conocimientos',
    category: 'Entretenimiento'
  },
  { 
    title: 'Lista de Tareas', 
    to: '/todo-list', 
    icon: 'i-ph-list-bullets-bold',
    description: 'Organiza tus pendientes eficientemente',
    category: 'Productividad'
  },
  { 
    title: 'Notas Rápidas', 
    to: '/sticky-notes', 
    icon: 'i-ph-note-bold',
    description: 'Notas tipo post-it con colores',
    category: 'Productividad'
  },
  { 
    title: 'Agenda Simple', 
    to: '/agenda', 
    icon: 'i-ph-calendar-bold',
    description: 'Gestiona tus eventos y citas',
    category: 'Organización'
  },
  { 
    title: 'Lista de Compras', 
    to: '/shopping-list', 
    icon: 'i-ph-shopping-cart-bold',
    description: 'Organiza tus compras del día',
    category: 'Organización'
  },
  { 
    title: 'Diccionario', 
    to: '/dictionary', 
    icon: 'i-ph-book-open-bold',
    description: 'Busca definiciones al instante.',
    category: 'Educación'
  },
  { 
    title: 'Traductor', 
    to: '/translator', 
    icon: 'i-ph-translate-bold',
    description: 'Traduce texto entre múltiples idiomas',
    category: 'Utilidades'
  }
])
</script>

<template>
  <UPageGrid>
    <UPageCard
        v-for="(app, index) in microApps"
        :key="index"
        :title="app.title"
        :description="app.description"
        :icon="app.icon"
        :to="app.to"
        variant="outline"
        />    
    </UPageGrid>
</template>