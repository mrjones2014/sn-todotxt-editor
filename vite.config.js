import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { version } from "./package.json";
import VitePluginZip from "vite-plugin-zip";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),

    // HTML templates
    createHtmlPlugin({
      pages: [
        {
          filename: "index.html",
          template: "index.html",
          entry: "src/index.tsx",
          injectOptions: {
            data: {
              version,
            },
          },
        },
        {
          filename: "demo.html",
          template: "demo.html",
          entry: "src/demo/demo.tsx",
          injectOptions: {
            data: {
              version,
            },
          },
        },
      ],
    }),

    // Copy public files and replace version
    viteStaticCopy({
      targets: [
        {
          src: "public/*",
          dest: "",
          transform: (content) => {
            return content.toString().replace("$VERSION$", version);
          },
        },
      ],
    }),

    // Create zip file
    VitePluginZip({
      dir: "dist",
      outputName: "latest",
    }),
  ],

  base: mode.toLowerCase() === "production" ? "/sn-todotxt-editor/" : "",

  // Resolve configuration
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },

  // Build configuration
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.tsx"),
        demo: resolve(__dirname, "src/demo/demo.tsx"),
      },
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
      },
      external: ["filesafe-js"],
    },
  },

  // Development server configuration
  server: {
    open: "/demo.html",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },

  // CSS configuration
  css: {
    // Vite handles CSS, SCSS, etc. out of the box
    preprocessorOptions: {
      scss: {
        // Add any SCSS options here if needed
      },
    },
  },
}));
