import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig({
  plugins: [jsconfigPaths()],
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
    },
  },
});
