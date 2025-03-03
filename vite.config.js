import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@context': path.resolve(__dirname, './src/context'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    // test: {
    //     globals: true,
    //     environment: 'jsdom',
    //     setupFiles: './src/setupTests.js',
    //     css:true,
    //     reporters: ['verbose'],
    //     coverage: {
    //         reporter: ['text', 'json', 'html'],
    //         include: ['src/**/*'],
    //         exclude: [],
    //     }
    // },
    host: 'localhost',
    server: {
        port: 3000,
    },
});
