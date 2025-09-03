<script setup>

const items = [
  {
    label: 'Inicio',
    to: 'https://go.nuxt.com/figma-ui',
    target: '_blank'
  },
  {
    label: 'Micro Apps',
    to: 'https://stackblitz.com/edit/nuxt-ui',
    target: '_blank'
  },
  {
    label: 'Contacto',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank'
  }
]
</script>

<template>
    <UFooter>
        <template #left>
            <p class="text-sm text-muted">Copyright © {{ new Date().getFullYear() }} Micro Apps</p>
        </template>
        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <UButton icon="ph:github-logo-bold" target="_blank" to="https://github.com/ingfranciscastillo/" aria-label="GitHub" variant="ghost" />
            <UButton icon="ph:linkedin-logo-bold" target="_blank" to="https://www.linkedin.com/in/ingfranciscastillo/" aria-label="LinkedIn" variant="ghost" />
            <UButton icon="ph:twitter-logo-bold" target="_blank" to="https://x.com/ingfranciscastillo" aria-label="Twitter" variant="ghost" />
            <UButton icon="ph:instagram-logo-bold" target="_blank" to="https://www.instagram.com/ingfranciscastillo/" aria-label="Instagram" variant="ghost" />
        </template>
    </UFooter>
</template>