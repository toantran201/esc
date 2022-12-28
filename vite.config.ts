/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'EscapeLib',
      formats: ['es', 'umd'],
      fileName: (format) => `escape-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'uuid'],
      output: {
        globals: {
          react: 'React',
          uuid: 'uuid',
        },
      },
    },
  },
})
