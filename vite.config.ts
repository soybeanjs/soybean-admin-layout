import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, `.env.${configEnv.mode}`);

  const isLib = viteEnv.VITE_LIB_MODE === '1';

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    },
    plugins: [vue(), unocss({ include: ['src/App.vue'] })],
    build: isLib
      ? {
          copyPublicDir: false,
          lib: {
            entry: path.resolve(process.cwd(), 'src/index.ts'),
            name: 'SoybeanAdminLayout',
            fileName: 'index',
            formats: ['es', 'cjs']
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue'
              }
            }
          }
        }
      : {}
  };
});
