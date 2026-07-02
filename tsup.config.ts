import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/sort.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: true
})
