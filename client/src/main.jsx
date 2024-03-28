import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode> // When you wrap your component tree with <React.StrictMode>, React intentionally invokes certain lifecycle methods twice in development mode to help identify and eliminate side effects. This double invocation can sometimes cause unexpected behavior with functions that should only run once per render cycle, such as socket emit commands.
    <App />
    // </React.StrictMode>
);
