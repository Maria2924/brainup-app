"use client";
import React, {useEffect, useState} from "react";
import {StatusBar, Style} from "@capacitor/status-bar";
import Logo from "@/components/logo/Logo";
import {navigation} from "@/utils/navigation";
import {Themed} from "@/components/themed";
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/conf";
import {ValidationError} from "@/types/laravel";
import {LoggedInResponse} from "@/types/auth";
import {Preferences} from "@capacitor/preferences";
import {Loader2} from "lucide-react";
import UniversalErrorCard from "@/components/UniversalErrorCard";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>("");

    const loginQuery = useQuery({
        queryKey: ['login', email, password],
        enabled: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const response = await fetch(`${config.BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                if (response.status === 422) {
                    try {
                        const error: ValidationError = await response.json();
                        console.debug(error)
                        return error;
                    } catch (e) {
                        throw new Error("Server failed to log you in. Please try again later.");
                    }
                } else {
                    throw new Error("Server failed to log you in. Please try again later.");
                }
            }

            const data: LoggedInResponse = await response.json();
            await Preferences.set({key: "USER", value: JSON.stringify({...data.user, access_token: data.token})});
            return data;
        }
    });

    useEffect(() => {
        (async () => await StatusBar.setStyle({style: Style.Dark}))();
    }, []);
    return (
        <div className={"min-h-screen bg-soft-black w-full safe-area-view text-white flex flex-col"}>
            <div className={"flex flex-row items-center gap-2"}>
                <Logo/>
                <h2 className={"font-bold text-primary text-lg"}>BrainUp</h2>
            </div>
            <div className={"mt-20"}>
                <h3 className={"text-4xl font-medium"}>Enhance your skills like never before.</h3>
                <p className={"py-2 text-sm"}>With BrainUp’s intelligent and assistive features,
                    you can become a champion in no time!</p>
            </div>
            <div className={"bg-white w-full p-4 absolute bottom-0 left-0 rounded-t-xl border-t-2 border-x-2 border-primary text-faded-black"}>
                <div className={"flex flex-col gap-6"}>
                    <h3 className={"font-bold text-lg"}>Sign in</h3>
                    <UniversalErrorCard error={error}/>
                    <Themed.TextInput
                        label={"Email Address"}
                        required={true}
                        type={"text"}
                        placeholder={"example@mail.com"}
                        value={email}
                        onChange={setEmail}
                    />
                    <Themed.TextInput
                        label={"Password"}
                        required={true}
                        type={"password"}
                        placeholder={"********"}
                        value={password}
                        onChange={setPassword}
                    />
                    <button
                        className={"bg-primary p-2 rounded-xl font-semibold text-[#202020] items-center justify-center"}
                        onClick={async () => {
                            if (!email || !password) {
                                return;
                            }

                            try {
                                const result = await loginQuery.refetch();
                                if (result.isError) {
                                    console.error(result.error);
                                    setError("Failed to log you in. Please try again later.");
                                    return;
                                }
                                if (result.data?.message) {
                                    if ((result.data as ValidationError)['errors']?.['email']) {
                                        navigation.redirect("/auth/create-account");
                                    } else {
                                        setError(result.data.message);
                                    }
                                } else if ((result.data as LoggedInResponse)?.token) {
                                    navigation.redirect("/home")
                                }
                            } catch (e) {
                                setError(e?.message ?? "Unknown error");
                            }
                        }}
                        disabled={loginQuery.isLoading || !email || !password}
                    >
                        {loginQuery.isLoading && (
                            <Loader2 size={26} className={"animate-spin w-full"}/>
                        )}
                        {!loginQuery.isLoading && (
                            "Continue"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
