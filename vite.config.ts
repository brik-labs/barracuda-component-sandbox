import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },
    build: isLib
      ? {
          lib: {
            entry: path.resolve(__dirname, "src/shared/index.ts"),
            formats: ["es"],
          },
          outDir: "dist",
          target: "esnext",
          minify: false,
          cssCodeSplit: false,
          rollupOptions: {
            external: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              /^@radix-ui\/.*/,
              /^recharts/,
              /^framer-motion/,
              /^sonner/,
              /^date-fns/,
              /^lucide-react/,
              /^react-day-picker/,
              /^class-variance-authority/,
              /^clsx/,
              /^tailwind-merge/,
            ],
            output: {
              preserveModules: true,
              preserveModulesRoot: "src/shared",
              entryFileNames: "[name].js",
            },
          },
        }
      : {
          outDir: "dist",
          target: "esnext",
          minify: "esbuild",
        },
  }
})
