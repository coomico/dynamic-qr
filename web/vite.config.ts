import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         'links': [
  //           './src/views/links/Links',
  //           './src/views/links/CollectionView',
  //           './src/views/links/NewView',
  //           './src/views/links/EditView',
  //         ]
  //       }
  //     }
  //   }
  // }
})
