import {Capacitor} from "@capacitor/core";

export const config = {
    BACKEND_URL: Capacitor.getPlatform() === "web" ? "http://localhost:8000" : "https://brainupdocked.onrender.com"
}
