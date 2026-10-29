import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
// Opcjonalnie: ścieżka do systemowego Chromium (np. w kontenerze chmurowym).
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    launchOptions: { executablePath },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    // Apache z PHP i .htaccess z folderu out, jak na hostingu OVH (scripts/serve.sh).
    command: "bash scripts/serve.sh",
    // Skrypt sam zamyka Apache po SIGTERM (domyślny SIGKILL zostawiłby serwer).
    gracefulShutdown: { signal: "SIGTERM", timeout: 5000 },
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    // Formularz wyceny loguje zapytanie zamiast wysyłać e-mail.
    env: { PORT: String(PORT), QUOTE_DRY_RUN: "1" },
  },
});
