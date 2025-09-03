<script setup>
    const microApps = [
  { 
    name: 'Conversor de Divisas', 
    href: '/currency-converter', 
    icon: 'ph:currency-dollar-bold',
    description: 'Convierte entre diferentes monedas con tasas actualizadas',
    category: 'Finanzas'
  },
  { 
    name: 'Conversor de Unidades', 
    href: '/unit-converter', 
    icon: 'ph:scales-bold',
    description: 'Longitud, peso, temperatura y velocidad',
    category: 'Utilidades'
  },
  { 
    name: 'Calculadora IMC', 
    href: '/bmi-calculator', 
    icon: 'ph:heart-bold',
    description: 'Calcula tu índice de masa corporal',
    category: 'Salud'
  },
  { 
    name: 'Generador de Contraseñas', 
    href: '/password-generator', 
    icon: 'ph:key-bold',
    description: 'Crea contraseñas seguras personalizables',
    category: 'Seguridad'
  },
  { 
    name: 'Temporizador Pomodoro', 
    href: '/pomodoro-timer', 
    icon: 'ph:clock-bold',
    description: 'Gestiona tu tiempo productivamente',
    category: 'Productividad'
  },
  { 
    name: 'Generador de Memes', 
    href: '/meme-generator', 
    icon: 'ph:smiley-bold',
    description: 'Crea memes divertidos fácilmente',
    category: 'Entretenimiento'
  },
  { 
    name: 'Trivia Game', 
    href: '/trivia-game', 
    icon: 'ph:puzzle-piece-bold',
    description: 'Pon a prueba tus conocimientos',
    category: 'Entretenimiento'
  },
  { 
    name: 'Lista de Tareas', 
    href: '/todo-list', 
    icon: 'ph:list-bullets-bold',
    description: 'Organiza tus pendientes eficientemente',
    category: 'Productividad'
  },
  { 
    name: 'Notas Rápidas', 
    href: '/sticky-notes', 
    icon: 'ph:note-bold',
    description: 'Notas tipo post-it con colores',
    category: 'Productividad'
  },
  { 
    name: 'Agenda Simple', 
    href: '/agenda', 
    icon: 'ph:calendar-bold',
    description: 'Gestiona tus eventos y citas',
    category: 'Organización'
  },
  { 
    name: 'Lista de Compras', 
    href: '/shopping-list', 
    icon: 'ph:shopping-cart-bold',
    description: 'Organiza tus compras del día',
    category: 'Organización'
  },
  { 
    name: 'Diccionario', 
    href: '/dictionary', 
    icon: 'ph:book-open-bold',
    description: 'Busca definiciones al instante',
    category: 'Educación'
  }
]
</script>

<template>
  <UPageGrid>
    <UPageCard
        v-for="(app, index) in microApps"
        v-bind="card"
        :key="index"
        >
        <NuxtLink :to="app.href">
          <UIcon :name="app.icon" class="size-8" />
            <h3 class="text-lg font-semibold text-foreground mb-2">
                {{ app.name }}
            </h3>
            <p class="text-sm text-foreground-500">
                {{ app.description }}
            </p>    
        </NuxtLink>
        </UPageCard>
    </UPageGrid>
</template>