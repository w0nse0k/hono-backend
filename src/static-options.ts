import type { ServeStaticOptions } from "@hono/node-server/serve-static";

export const staticOptions: ServeStaticOptions = {
  root: "../vite-frontend/dist",

  rewriteRequestPath: (path) => {
    // 루트
    if (path === "/") {
      return "/index.html";
    }

    // 확장자가 있는 파일(JS, CSS, 이미지 등)은 그대로
    if (/\.[^/]+$/.test(path)) {
      return path;
    }

    // 디렉터리 URL
    if (path.endsWith("/")) {
      return `${path}index.html`;
    }

    // 확장자가 없는 페이지
    return `${path}.html`;
  },
};
