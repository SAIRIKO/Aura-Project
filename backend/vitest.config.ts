import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        // Limit test discovery to the unitarios and integracao folders
        include: ["tests/unitarios/**/*.test.ts", "tests/integracao/**/*.test.ts"],
        coverage: {
            reporter: ["text", "html"],
        },
    },
});
