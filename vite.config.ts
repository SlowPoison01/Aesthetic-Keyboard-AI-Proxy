import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base URL for the API to ensure it works correctly in development and production
  server: {
    proxy: {
      // Proxy requests starting with /api to the Node.js server running on port 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // The rewrite rule is important when deploying the server/client combo
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
    // Ensure the client runs on port 5173 (Vite default)
    port: 5173,
  },
  build: {
    // This setting ensures that the build output is ready for static serving
    outDir: 'dist',
  }
});
