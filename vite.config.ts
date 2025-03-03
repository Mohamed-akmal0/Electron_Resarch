import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-react" //! reason for this to give explicityly ==> 
    //! electron creates the bundle in the name of dist, so it will conflict with vite build folder
  },
  server: {
    port: 5555,
    strictPort: true
  }
})
