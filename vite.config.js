// marketai-frontend/vite.config.js
import { defineConfig } from 'vite';
import react          from '@vitejs/plugin-react';

export default defineConfig({
  root: '.',           // 이 폴더를 Vite root로 삼습니다
  base: '/',           // 빌드 시 HTML <base> 경로
  plugins: [react()],
  server: {
    port: 5173         // dev 서버 포트(필요 시 변경)
  }
});
