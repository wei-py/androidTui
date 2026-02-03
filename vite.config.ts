import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 为终端应用设置不同的构建目标
  build: {
    target: 'node16',
    lib: {
      entry: './src/main.tsx',
      name: 'androidTui',
      formats: ['cjs'] // CommonJS格式更适合终端应用
    },
    rollupOptions: {
      external: ['ink', 'react', 'react-dom'],
    },
  },
  // 使应用可以在终端中运行
  define: {
    global: 'globalThis',
  },
})
