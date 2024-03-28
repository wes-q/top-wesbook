import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// Remove if Proxy transferred to NGINX
// export default defineConfig({
//     base: "/",
//     plugins: [react(), svgr()],
//     preview: {
//         port: 8080,
//         strictPort: true,
//     },
//     server: {
//         port: 8080,
//         strictPort: true,
//         host: true,
//         origin: "http://localhost:8080",
//         proxy: {
//             "/auth": {
//                 target: "http://server:3001", // set to 3001 for development purposes
//                 changeOrigin: true,
//             },
//             "/api": {
//                 target: "http://server:3001", // set to 3001 for development purposes
//                 changeOrigin: true,
//             },
//         },
//     },
// });

export default defineConfig({
    plugins: [react(), svgr()],
});
