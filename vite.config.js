import { defineConfig } from "vite";

export default defineConfig({
  base: "/cognix-product/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        product: "product.html"
      }
    }
  }
});
