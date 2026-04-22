<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-foreground-700 mb-2">
          Longitud: {{ length }} caracteres
        </label>
        <UInputNumber
          v-model="length"
          :min="4"
          :max="128"
          variant="outline"
        />
      </div>

      <div class="space-y-3">
        <UCheckbox v-model="options.uppercase" label="Mayúsculas (A-Z)" />
        <UCheckbox v-model="options.lowercase" label="Minúsculas (a-z)" />
        <UCheckbox v-model="options.numbers" label="Números (0-9)" />
        <UCheckbox v-model="options.symbols" label="Símbolos (!@#$%^&*)" />
      </div>
    </div>

    <UInput
      :model-value="generatedPassword"
      readonly
      variant="outline"
      class="font-mono text-lg"
      @click="copyToClipboard"
    >
      <template #trailing>
        <UButton
          variant="ghost"
          size="sm"
          icon="i-lucide-copy"
          @click.stop="copyToClipboard"
        />
      </template>
    </UInput>

    <div class="flex gap-2">
      <UButton color="primary" class="flex-1" @click="generatePassword">
        <UIcon name="i-lucide-refresh-cw" class="mr-2" />
        Generar Nueva Contraseña
      </UButton>
      <UButton variant="outline" @click="copyToClipboard">
        <UIcon name="i-lucide-copy" class="mr-2" />
        Copiar
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

const length = ref(12)
const generatedPassword = ref('')
const options = ref({
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false
})

const generatePassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let chars = ''
  if (options.value.uppercase) chars += uppercase
  if (options.value.lowercase) chars += lowercase
  if (options.value.numbers) chars += numbers
  if (options.value.symbols) chars += symbols

  if (!chars) {
    chars = lowercase
    options.value.lowercase = true
  }

  let password = ''
  for (let i = 0; i < length.value; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  generatedPassword.value = password
}

const copyToClipboard = async () => {
  if (!generatedPassword.value) {
    generatePassword()
    return
  }
  
  try {
    await navigator.clipboard.writeText(generatedPassword.value)
    toast.add({
      title: 'Contraseña copiada',
      description: 'La contraseña ha sido copiada al portapapeles',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
  } catch (error) {
    console.error('Error copying to clipboard:', error)
  }
}

generatePassword()
</script>