import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': '/src',// Set the alias "@" to point to the "src" directory 
      // You can add more aliases as needed, e.g.,
      // 'src': path.resolve(__dirname, './src'),
    },
  },
});
