import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
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
