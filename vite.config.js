import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth": "https://mothership-backend-b502f96270d5.herokuapp.com"
    }
  },
  plugins: [react()],
})
