import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	server: {
		port: 3000,
	},
	assetsInclude: '/src/assets/images/arrow-blue.svg',
	resolve: {
		alias: {
			src: fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	base: '/',
	build: {
		emptyOutDir: true,
	},
});
