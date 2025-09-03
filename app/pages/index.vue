<template>
  <UDashboardPanel id="main">
    
    <UPageHero orientation="horizontal" title="Micro Apps" description="Explora todas las herramientas útiles que tenemos para ti."/>

    <MicroApps />
  </UDashboardPanel>
</template>

<script setup>
import MicroApps from '@/components/layout/MicroApps.vue'

// Configuración SEO
useHead({
  title: 'Dashboard - Micro Apps',
  meta: [
    { name: 'description', content: 'Dashboard con múltiples micro-aplicaciones útiles para tu día a día' }
  ]
})
</script>