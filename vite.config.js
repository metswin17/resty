
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Vite configuration with Vitest testing support
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
