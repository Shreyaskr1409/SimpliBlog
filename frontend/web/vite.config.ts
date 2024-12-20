import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    server: {
        proxy: {
            '/api/v1': 'http://localhost:4400',
            '/api/v2': 'http://localhost:4400',
        },
    },
});
