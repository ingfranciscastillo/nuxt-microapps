<template>
  <UPageHero 
    orientation="horizontal" 
    title="UtiliApp" 
    description="Explora todas las herramientas útiles que tenemos para ti." headline="New release"
    :links="links"
  />
</template>

<script setup lang="ts">
const links = ref([
  {
    label: 'Comienza ahora',
    to: '/apps',
  }
])

// Configuración SEO
useHead({
  title: 'UtiliApp',
  htmlAttrs: {
    lang: 'es'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'UtiliApp es una plataforma que te ofrece una variedad de micro-aplicaciones útiles para tu día a día.' }
  ]
})
</script>