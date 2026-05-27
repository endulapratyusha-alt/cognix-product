import { defineConfig } from "vite";

export default defineConfig({
  base: "/cognix-product/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        pmm: "pmm.html",
        product: "product.html",
        freeAuditAccess: "free-audit-access.html",
        paidAuditAccess: "paid-audit-access.html"
      }
    }
  }
});
