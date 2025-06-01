import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // No sass plugin needed here, Vite has built-in support if 'sass' is installed
  ],
  build: {
    outDir: 'dist', // Output directory for build files
    rollupOptions: {
      input: {
        main: 'index.html' // Assuming index.html is in the root of hydrocav_website_manus
      }
    },
    minify: 'terser', // Minification for JS, 'cssnano' for CSS (default)
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if needed
        // For example, if you have global SCSS variables or mixins:
        // additionalData: `@import "./src/styles/_variables.scss";`
        // Ensure the path is correct relative to this config file or use absolute paths.
      }
    }
  },
  // Vite defaults to serving static assets from a 'public' directory.
  // If your 'images' directory is directly under 'hydrocav_website_manus' and
  // referenced like './images/...' in HTML or '../images/...' in CSS,
  // you might need to move 'images' into 'hydrocav_website_manus/public/images'
  // or adjust base path settings if Vite doesn't pick them up correctly.
  // For now, we'll handle moving images in a later step as per the plan.
  publicDir: 'public' // Explicitly set public directory (Vite's default is 'public')
});
