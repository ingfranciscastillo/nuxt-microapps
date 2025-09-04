<script setup>
    const microApps = ref([
  { 
    title: 'Conversor de Divisas', 
    to: '/currency-converter', 
    icon: 'ph:currency-dollar-bold',
    description: 'Convierte entre diferentes monedas con tasas actualizadas',
    category: 'Finanzas'
  },
  { 
    title: 'Conversor de Unidades', 
    to: '/unit-converter', 
    icon: 'ph:scales-bold',
    description: 'Longitud, peso, temperatura y velocidad',
    category: 'Utilidades'
  },
  { 
    title: 'Calculadora IMC', 
    to: '/bmi-calculator', 
    icon: 'ph:heart-bold',
    description: 'Calcula tu índice de masa corporal',
    category: 'Salud'
  },
  { 
    title: 'Generador de Contraseñas', 
    to: '/password-generator', 
    icon: 'ph:key-bold',
    description: 'Crea contraseñas seguras personalizables',
    category: 'Seguridad'
  },
  { 
    title: 'Temporizador Pomodoro', 
    to: '/pomodoro-timer', 
    icon: 'ph:clock-bold',
    description: 'Gestiona tu tiempo productivamente',
    category: 'Productividad'
  },
  { 
    title: 'Generador de Memes', 
    to: '/meme-generator', 
    icon: 'ph:smiley-bold',
    description: 'Crea memes divertidos fácilmente',
    category: 'Entretenimiento'
  },
  { 
    title: 'Trivia Game', 
    to: '/trivia-game', 
    icon: 'ph:puzzle-piece-bold',
    description: 'Pon a prueba tus conocimientos',
    category: 'Entretenimiento'
  },
  { 
    title: 'Lista de Tareas', 
    to: '/todo-list', 
    icon: 'ph:list-bullets-bold',
    description: 'Organiza tus pendientes eficientemente',
    category: 'Productividad'
  },
  { 
    title: 'Notas Rápidas', 
    to: '/sticky-notes', 
    icon: 'ph:note-bold',
    description: 'Notas tipo post-it con colores',
    category: 'Productividad'
  },
  { 
    title: 'Agenda Simple', 
    to: '/agenda', 
    icon: 'ph:calendar-bold',
    description: 'Gestiona tus eventos y citas',
    category: 'Organización'
  },
  { 
    title: 'Lista de Compras', 
    to: '/shopping-list', 
    icon: 'ph:shopping-cart-bold',
    description: 'Organiza tus compras del día',
    category: 'Organización'
  },
  { 
    title: 'Diccionario', 
    to: '/dictionary', 
    icon: 'ph:book-open-bold',
    description: 'Busca definiciones al instante.',
    category: 'Educación'
  },
  { 
    title: 'Traductor', 
    to: '/translator', 
    icon: 'ph:translate-bold',
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