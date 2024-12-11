/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import glob from 'fast-glob';
import sass from 'sass';
import fs from 'fs/promises';

export default defineConfig({
    build: {
        target: 'modules',
        outDir: 'dist',
        minify: true,
        rollupOptions: {
            external: ['vue', /\.scss/, '@koihe/boat-utils'],
            input: resolve(__dirname, './index.ts'),
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].mjs',
                    preserveModules: true,
                    // preserveModulesRoot: 'src',
                    dir: resolve(__dirname, 'dist/es'),
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    // preserveModulesRoot: 'src',
                    dir: resolve(__dirname, 'dist/lib'),
                },
            ],
        },
        lib: {
            entry: './index.ts',
            name: 'BoatUI',
            formats: ['umd'],
            fileName: 'boat-ui',
        },
    },
    plugins: [
        vue(),
        dts({
            entryRoot: '.',
            // entryRoot: './components',
            outDir: [resolve(__dirname, 'dist/es'), resolve(__dirname, 'dist/lib')],
            tsconfigPath: './tsconfig.json',
        }),
        {
            name: 'style',
            async generateBundle(_, bundle) {
                // 找到所有的 SCSS 文件
                const scssFiles = await glob('components/**/*.scss');

                let allCssContent = '';
                for (const file of scssFiles) {
                    try {
                        const result = sass.compile(file);
                        const cssFilePath = file
                            .replace('components/', 'dist/es/')
                            .replace('.scss', '.css');
                        await fs.mkdir(resolve(cssFilePath, '..'), { recursive: true });
                        await fs.writeFile(cssFilePath, result.css);
                        allCssContent += result.css;
                    } catch (err) {
                        console.error(`Error compiling ${file}:`, err);
                    }
                }

                const stylesDir = resolve(__dirname, 'dist/es/styles');
                await fs.mkdir(stylesDir, { recursive: true });
                await fs.writeFile(resolve(stylesDir, 'index.css'), allCssContent);

                this.emitFile({
                    type: 'asset',
                    fileName: 'styles/index.css',
                    source: allCssContent,
                });
            },
        },
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/variables.scss";',
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'components'),
        },
    },
});
