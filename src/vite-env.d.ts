interface ImportMetaEnv {
    readonly VITE_WS_URL: string
    // 다른 환경 변수들도 여기에 추가
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}