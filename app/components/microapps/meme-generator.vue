<template>
  <div class="space-y-6">
    <!-- Subida de imagen principal -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">📷 Subir Imagen</h3>
      </template>
      
      <div class="space-y-4">
        <!-- Subir imagen personalizada - PRINCIPAL -->
        <div>
          <UFileUpload
            v-model="uploadedFile"
            accept="image/*"
            :max-size="5 * 1024 * 1024"
          />
        </div>

        <!-- Plantillas predefinidas - SECUNDARIAS -->
        <div>
          <label class="text-sm font-medium text-muted-foreground mb-3 block">
            O elige una plantilla popular
          </label>
          <div class="grid grid-cols-6 gap-2">
            <UCard
              v-for="template in templates"
              :key="template.id"
              :class="[
                'cursor-pointer transition-all duration-200 hover:scale-105',
                selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
              ]"
              @click="selectTemplate(template.id)"
            >
              <div class="aspect-square overflow-hidden rounded-lg">
                <img 
                  :src="template.url" 
                  :alt="template.name"
                  class="w-full h-full object-cover"
                >
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Preview y estilos lado a lado -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Preview -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">👀 Vista Previa</h3>
        </template>
        
        <!-- Texto Superior -->
        <div class="mb-4">
          <label class="text-sm font-medium text-muted-foreground mb-2 block">
            Texto Superior
          </label>
          <UInput
            v-model="topText"
            placeholder="Escribe aquí..."
            class="w-full"
            @input="updatePreview"
          />
        </div>
        
        <div class="flex justify-center">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <canvas 
              ref="memeCanvas" 
              :width="canvasWidth" 
              :height="canvasHeight"
              class="max-w-full max-h-96 rounded-lg shadow-lg"
            />
          </div>
        </div>

        <!-- Texto Inferior -->
        <div class="mt-4">
          <label class="text-sm font-medium text-muted-foreground mb-2 block">
            Texto Inferior
          </label>
          <UInput
            v-model="bottomText"
            placeholder="Escribe aquí..."
            class="w-full"
            @input="updatePreview"
          />
        </div>

        <!-- Botones de acción debajo del preview -->
        <div class="mt-4 grid grid-cols-3 gap-2">
          <UButton
            color="primary"
            @click="downloadImage"
          >
            <UIcon name="i-lucide-download" class="mr-2" />
            Descargar
          </UButton>
          
          <UButton
            color="secondary"
            variant="outline"
            @click="copyToClipboard"
          >
            <UIcon name="i-lucide-copy" class="mr-2" />
            Copiar
          </UButton>
          
          <UButton
            color="green"
            variant="soft"
            @click="shareOnSocial"
          >
            <UIcon name="i-lucide-share-2" class="mr-2" />
            Compartir
          </UButton>
        </div>
      </UCard>

      <!-- Controles de estilo -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">🎨 Estilos</h3>
        </template>
        
        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-muted-foreground">
              Tamaño de fuente: {{ fontSize }}px
            </label>
            <USlider
              v-model="fontSize"
              :min="20"
              :max="80"
              @change="updatePreview"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-muted-foreground">
              Color del texto
            </label>
            <UColorPicker
              v-model="textColor"
              @change="updatePreview"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-muted-foreground">
              Grosor del borde: {{ strokeWidth }}px
            </label>
            <USlider
              v-model="strokeWidth"
              :min="0"
              :max="10"
              @change="updatePreview"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-muted-foreground">
              Color del borde
            </label>
            <UColorPicker
              v-model="strokeColor"
              @change="updatePreview"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const toast = useToast()

// Plantillas de memes predefinidas
const templates = ref([
  { id: 'distracted', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1bij.jpg' },
  { id: 'two-buttons', name: 'Two Buttons', url: 'https://static01.nyt.com/images/2016/08/05/us/05onfire1_xp/05onfire1_xp-superJumbo-v2.jpg' },
  { id: 'change-mind', name: 'Change My Mind', url: 'https://i.imgflip.com/24y43o.jpg' },
  { id: 'woman-cat', name: 'Woman Yelling at Cat', url: 'https://i.imgflip.com/345v97.jpg' },
  { id: 'this-fine', name: 'This is Fine', url: 'https://i.imgflip.com/26am.jpg' }
])

// Estado del componente
const selectedTemplate = ref('distracted')
const topText = ref('')
const bottomText = ref('')
const fontSize = ref(40)
const textColor = ref('#ffffff')
const strokeColor = ref('#000000')
const strokeWidth = ref(3)
const uploadedFile = ref([])
const uploadedImage = ref(null)

// Referencias del canvas
const memeCanvas = ref(null)
const canvasWidth = ref(500)
const canvasHeight = ref(500)

// Seleccionar plantilla
const selectTemplate = (templateId) => {
  selectedTemplate.value = templateId
  uploadedImage.value = null
  uploadedFile.value = []
  updatePreview()
}

// Manejar subida de imagen
const handleImageUpload = (files) => {
  if (files && files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImage.value = e.target.result
      selectedTemplate.value = null
      updatePreview()
    }
    reader.readAsDataURL(file)
  }
}

// Watch para cambios en uploadedFile
watch(uploadedFile, (newFiles) => {
  if (newFiles && newFiles.length > 0) {
    handleImageUpload(newFiles)
  }
})

// Actualizar preview del meme
const updatePreview = async () => {
  await nextTick()
  const canvas = memeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Cargar imagen base
  const img = new Image()
  img.crossOrigin = 'anonymous'
  
  img.onload = () => {
    // Ajustar dimensiones del canvas según la imagen
    const aspectRatio = img.width / img.height
    canvasWidth.value = 500
    canvasHeight.value = 500 / aspectRatio
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value

    // Dibujar imagen
    ctx.drawImage(img, 0, 0, canvasWidth.value, canvasHeight.value)

    // Dibujar textos
    drawText(ctx, topText.value, 'top')
    drawText(ctx, bottomText.value, 'bottom')
  }

  // Usar imagen subida o plantilla seleccionada
  if (uploadedImage.value) {
    img.src = uploadedImage.value
  } else {
    const template = templates.value.find(t => t.id === selectedTemplate.value)
    if (template) {
      img.src = template.url
    }
  }
}

// Dibujar texto en el canvas
const drawText = (ctx, text, position) => {
  if (!text) return

  ctx.font = `bold ${fontSize.value}px Impact, Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const x = canvasWidth.value / 2
  let y

  if (position === 'top') {
    y = fontSize.value + 20
  } else {
    y = canvasHeight.value - fontSize.value - 20
  }

  // Dibujar borde del texto
  if (strokeWidth.value > 0) {
    ctx.strokeStyle = strokeColor.value
    ctx.lineWidth = strokeWidth.value
    ctx.strokeText(text, x, y)
  }

  // Dibujar texto
  ctx.fillStyle = textColor.value
  ctx.fillText(text, x, y)
}

// Descargar imagen
const downloadImage = () => {
  const canvas = memeCanvas.value
  if (!canvas) return

  const link = document.createElement('a')
  link.download = `meme-${Date.now()}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
  
  toast.add({
    title: 'Imagen descargada',
    description: 'Tu meme se ha descargado correctamente',
    color: 'primary',
    icon: 'i-lucide-download'
  })
}

// Copiar enlace al portapapeles
const copyToClipboard = async () => {
  const canvas = memeCanvas.value
  if (!canvas) return

  try {
    const dataUrl = canvas.toDataURL('image/png')
    await navigator.clipboard.writeText(dataUrl)
    
    toast.add({
      title: 'Enlace copiado',
      description: 'Enlace copiado al portapapeles',
      color: 'primary',
      icon: 'i-lucide-copy'
    })
  } catch (err) {
    console.error('Error al copiar:', err)
    toast.add({
      title: 'Error',
      description: 'No se pudo copiar el enlace',
      color: 'red',
      icon: 'i-lucide-alert-circle'
    })
  }
}

// Compartir en redes sociales
const shareOnSocial = () => {
  const canvas = memeCanvas.value
  if (!canvas) return

  canvas.toBlob((_blob) => {
    const file = new File([_blob], 'meme.png', { type: 'image/png' })
    
    if (navigator.share) {
      navigator.share({
        title: 'Mi meme personalizado',
        text: '¡Mira el meme que creé!',
        files: [file]
      }).catch(err => console.log('Error al compartir:', err))
    } else {
      // Fallback: descargar la imagen
      downloadImage()
    }
  })
}

// Inicializar preview al montar el componente
onMounted(() => {
  updatePreview()
})
</script>