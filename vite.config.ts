const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
        searchLocation: resolve(__dirname, 'searchLocation.html'),
        favorites: resolve(__dirname, 'favorites.html')
      }
    }
  }
})