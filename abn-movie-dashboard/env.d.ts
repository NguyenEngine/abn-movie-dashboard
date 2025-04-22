/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_IMG_NOT_FOUND: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}