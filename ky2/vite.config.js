import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Explicitly inject VITE_ envs at build time so Docker builds work reliably
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY || '')
    },
  }
})
