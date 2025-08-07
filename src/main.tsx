import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/errorHandler"; // Import global error handler

createRoot(document.getElementById("root")!).render(<App />);
