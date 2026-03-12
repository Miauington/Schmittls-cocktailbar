import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/Schmittls-cocktailbar/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                angebot: resolve(__dirname, 'angebot.html'),
                events: resolve(__dirname, 'events.html'),
                'ueber-uns': resolve(__dirname, 'ueber-uns.html'),
                kontakt: resolve(__dirname, 'kontakt.html'),
                impressum: resolve(__dirname, 'impressum.html'),
                datenschutz: resolve(__dirname, 'datenschutz.html'),
                'admin-login': resolve(__dirname, 'admin/login.html'),
                'admin-dashboard': resolve(__dirname, 'dashboard.html'),
            },
        },
    },
    server: {
        open: true,
    },
})
