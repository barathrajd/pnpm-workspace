import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    __BROWSER__: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
  },
});
