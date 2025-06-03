import {useEffect, useState} from "react";
import type {UserWithAuthToken} from "@/types/auth";
import {Preferences} from "@capacitor/preferences";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import {redirect, RedirectType} from "next/navigation";

export default function useUser(validate: boolean = false) {
    const [status, setStatus] = useState<"loading" | "done">("loading");
    const [user, setUser] = useState<UserWithAuthToken | null>(null);
    useEffect(() => {
        async function getUser() {
            try {
                const storedUser = await Preferences.get({ key: "USER" });
                if (storedUser.value) {
                    try {
                        const parsedUser: UserWithAuthToken = JSON.parse(storedUser.value);
                        if (validate) {
                            const validationResult = await fetchAuthenticated(parsedUser, "/api/user", {
                                headers: {
                                    "Accept": "application/json",
                                }
                            });
                            if (!validationResult.ok) {
                                console.error("User validation failed, redirecting to login.");
                                setUser(null);

                                await Preferences.remove({ key: "USER" });
                            } else {
                                try {
                                    await validationResult.json();
                                    setUser(parsedUser);
                                } catch (e) {
                                    console.error("Failed to parse user data:", e);
                                    setUser(null);

                                    await Preferences.remove({ key: "USER" });
                                }
                            }
                        } else {
                            setUser(parsedUser);
                        }
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
            redirect("/auth/login", RedirectType.replace);
        }
    }, [status, user]);

    const signOut = () => {
        Preferences.remove({ key: "USER" });
        setUser(null);
        redirect("/auth/login", RedirectType.replace);
    }

    return {
        user,
        signOut,
        userFetchStatus: status
    }
}
