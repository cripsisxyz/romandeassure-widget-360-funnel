import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'RA360Widget',        // window.RA360Widget
      formats: ['iife'],
      fileName: () => 'widget.js' // salida: dist/widget.js
    },
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2018'
  }
})

