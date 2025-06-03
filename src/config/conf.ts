import {Capacitor} from "@capacitor/core";

const isDevelopmentBuild = true;
export const config = {
    BACKEND_URL: Capacitor.getPlatform() === "web" ? "http://localhost:8000" :
        isDevelopmentBuild ? "http://172.20.10.2:8000" : "https://brainupdocked.onrender.com"
}
