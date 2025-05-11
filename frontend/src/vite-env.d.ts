/// <reference types="vite/client" />
interface ImportMeta {
  readonly env: {
    MODE: string;
    BASE_URL: string;
    PROD: boolean;
    DEV: boolean;
    SSR: boolean;
    [key: string]: any;
  };
}
