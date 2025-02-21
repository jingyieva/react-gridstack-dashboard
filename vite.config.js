import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

const { resolve } = path;
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'actions': resolve(__dirname, 'src/actions'),
            'assets': resolve(__dirname, 'src/assets'),
            'components': resolve(__dirname, 'src/components'),
            'constants': resolve(__dirname, 'src/constants'),
            'layouts': resolve(__dirname, 'src/layouts'),
            'styles': resolve(__dirname, 'src/styles'),
            'utils': resolve(__dirname, 'src/utils'),
            'views': resolve(__dirname, 'src/views'),
        },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.css']
    },
})
