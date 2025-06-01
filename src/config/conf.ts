import {Capacitor} from "@capacitor/core";

export const config = {
    BACKEND_URL: Capacitor.getPlatform() === "web" ? "http://localhost:8000" : "https://s21ca7i24n.sharedwithexpose.com"
}
