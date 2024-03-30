import { io } from "socket.io-client";

// Undefined is used if backend is accessible through the frontend URL via proxy
// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3001";
// const URL = process.env.NODE_ENV === "production" ? undefined : `${import.meta.env.VITE_SERVER_URL}`;
const URL = `${import.meta.env.VITE_SERVER_URL}`;

export const socket = io(URL);
