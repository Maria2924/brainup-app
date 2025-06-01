import {User, UserWithAuthToken} from "@/types/auth";
import {config} from "@/config/conf";

export const fetchAuthenticated = (user: UserWithAuthToken, path: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${user.access_token}`);
    headers.set("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        ...options,
        headers,
    };

    return fetch(`${config.BACKEND_URL}${path}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        });
}
