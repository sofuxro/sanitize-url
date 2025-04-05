/// <reference types="vitest/config" />
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Sanitize url',
      fileName: 'index',
    },
    sourcemap: true,
  },

  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
