import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",

        // Onde procurar testes
        include: [
            "tests/unitarios/**/*.test.ts",
            "tests/integracao/**/*.test.ts"
        ],

        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            reportsDirectory: "./coverage"
        },
    },
});
