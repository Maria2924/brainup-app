import {useEffect, useState} from "react";
import type {UserWithAuthToken} from "@/types/auth";
import {Preferences} from "@capacitor/preferences";
import {navigation} from "@/utils/navigation";

export default function useUser() {
    const [status, setStatus] = useState<"loading" | "done">("loading");
    const [user, setUser] = useState<UserWithAuthToken | null>(null);
    useEffect(() => {
        async function getUser() {
            try {
                const storedUser = await Preferences.get({ key: "USER" });
                if (storedUser.value) {
                    try {
                        const parsedUser: UserWithAuthToken = JSON.parse(storedUser.value);
                        setUser(parsedUser);
                    } catch (e) {
                        console.error("Failed to parse user data:", e);
                    }
                }
            } finally {
                setStatus("done")
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        if (status === "done" && !user && window.location.pathname !== "/auth/login") {
            navigation.replace("/auth/login");
        }
    }, [status, user]);

    return {
        user,
        userFetchStatus: status
    }
}
