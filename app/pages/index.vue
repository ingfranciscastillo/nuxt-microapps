<template>
  <div class="space-y-6">
    <!-- Bienvenida -->
    <UCard class="bg-gradient-to-r from-primary/10 to-secondary/10">
      <UContainer class="text-center p-8">
        <div class="mb-4">
          <Icon icon="ph:sparkle-bold" class="mx-auto h-12 w-12 text-primary" />
        </div>
        <h1 class="text-3xl font-bold text-foreground mb-2">
          ¡Bienvenido al Dashboard de Micro Apps!
        </h1>
        <p class="text-foreground-600 text-lg">
          Explora todas las herramientas útiles que tenemos para ti
        </p>
      </UContainer>
    </UCard>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <UContainer class="flex flex-row items-center gap-4 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon icon="ph:squares-four-bold" class="h-6 w-6 text-primary" />
          </div>
          <div>
            <p class="text-2xl font-bold text-foreground">12</p>
            <p class="text-sm text-foreground-500">Micro Apps</p>
          </div>
        </UContainer>
      </UCard>
      
      <UCard>
        <UContainer class="flex flex-row items-center gap-4 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon icon="ph:check-bold" class="h-6 w-6 text-success" />
          </div>
          <div>
            <p class="text-2xl font-bold text-foreground">100%</p>
            <p class="text-sm text-foreground-500">Funcionales</p>
          </div>
        </UContainer>
      </UCard>
      
      <UCard>
        <UContainer class="flex flex-row items-center gap-4 p-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icon icon="ph:lightning-bold" class="h-6 w-6 text-warning" />
          </div>
          <div>
            <p class="text-2xl font-bold text-foreground">Rápido</p>
            <p class="text-sm text-foreground-500">y Eficiente</p>
          </div>
        </UContainer>
      </UCard>
    </div>

    <!-- Grid de micro-apps -->
    <UContainer>
      <h2 class="text-xl font-semibold text-foreground mb-4">Todas las aplicaciones</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UCard
          v-for="app in microApps"
          :key="app.href"
          isPressable
          isHoverable
          class="transition-transform hover:scale-105"
          @click="$router.push(app.href)"
        >
          <UContainer class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon :icon="app.icon" class="h-6 w-6 text-primary" />
              </div>
              <UChip size="sm" variant="flat" color="primary">
                {{ app.category }}
              </UChip>
            </div>
            
            <h3 class="text-lg font-semibold text-foreground mb-2">
              {{ app.name }}
            </h3>
            <p class="text-sm text-foreground-500">
              {{ app.description }}
            </p>
          </UContainer>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

// Configuración SEO
useHead({
  title: 'Dashboard - Micro Apps',
  meta: [
    { name: 'description', content: 'Dashboard con múltiples micro-aplicaciones útiles para tu día a día' }
  ]
})

// Lista de micro-aplicaciones con categorías
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