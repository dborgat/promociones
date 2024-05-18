import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        cors: true,
        port: 3000,
        host: '0.0.0.0',
        hmr: {
            clientPort: 3000,
            host: 'localhost',
            protocol: 'ws',
        },
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
