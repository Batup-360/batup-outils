/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID (G-XXXXXXX). Same property as batup.fr. Unset in dev → analytics no-op. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
