import {Capacitor} from "@capacitor/core";

const isDevelopmentBuild = false;
export const config = {
    BACKEND_URL: Capacitor.getPlatform() === "web" ? "http://localhost:8000" :
        isDevelopmentBuild ? "http://172.20.10.2:8000" : "https://brainup.onrender.com"
}
