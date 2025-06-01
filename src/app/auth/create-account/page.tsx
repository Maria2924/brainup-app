"use client";
import {AlertOctagonIcon, ChevronLeft, Loader2} from "lucide-react";
import {navigation} from "@/utils/navigation";
import ThemedTextInput from "@/components/themed/inputs/ThemedTextInput";
import React, {useState} from "react";
import {Themed} from "@/components/themed";
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/conf";
import {ValidationError} from "@/types/laravel";
import {LoggedInResponse, RegisteredUserResponse} from "@/types/auth";
import {Preferences} from "@capacitor/preferences";
import UniversalErrorCard from "@/components/UniversalErrorCard";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");

    const [error, setError] = useState<string | null>(null);

    const registerQuery = useQuery({
        queryKey: ['register', email, password],
        enabled: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const response = await fetch(`${config.BACKEND_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: firstName + (middleName ? " " + middleName : "") + " " + lastName,
                    email,
                    password,
                    password_confirmation: password,
                }),
            });
            if (!response.ok) {
                if (response.status === 422) {
                    try {
                        const error: ValidationError = await response.json();
                        return error;
                    } catch (e) {
                        throw new Error("Server failed to register. Please try again later.");
                    }
                } else {
                    throw new Error("Server failed to register. Please try again later.");
                }
            }

            const data: RegisteredUserResponse = await response.json();
            await Preferences.set({key: "USER", value: JSON.stringify({...data.user, access_token: data.access_token})});
            return data;
        }
    });

    return (
        <div className={"safe-area-view min-h-screen flex flex-col pb-4"}>
            <button className={"flex flex-row items-center gap-2"} onClick={() => navigation.goBack()}>
                <ChevronLeft size={24}/>
            </button>

            <div className={"flex flex-col justify-between flex-1 mt-8"}>
                <div>
                    <h3 className={"text-3xl font-bold text-faded-black"}>Welcome!</h3>
                    <p className={"text-xl mt-2"}>Let’s help you get started first by getting to know you first!</p>
                    <div className={"flex flex-col gap-4 mt-4"}>
                        <UniversalErrorCard error={error}/>
                        <ThemedTextInput
                            label={"First Name"}
                            required={true}
                            placeholder={"Juan"}
                            value={firstName}
                            onChange={setFirstName}
                        />
                        <ThemedTextInput
                            label={"Middle Name"}
                            placeholder={"Dela"}
                            value={middleName}
                            onChange={setMiddleName}
                        />
                        <ThemedTextInput
                            label={"Last Name"}
                            required={true}
                            placeholder={"Cruz"}
                            value={lastName}
                            onChange={setLastName}
                        />
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
                    </div>
                </div>
                <div className={"w-full"}>
                    <button
                        className={"bg-primary p-2 rounded-xl font-semibold text-[#202020] w-full"}
                        onClick={async () => {
                            if (!email || !password || !firstName || !lastName) {
                                return;
                            }

                            try {
                                const result = await registerQuery.refetch();
                                if (result.isError) {
                                    console.error(result.error);
                                    setError("Failed to log you in. Please try again later.");
                                    return;
                                }
                                if (result.data?.errors) {
                                    const errors = result.data as ValidationError;
                                    setError(Object.entries(errors.errors)[0][1]);
                                } else if ((result.data as RegisteredUserResponse)?.access_token) {
                                    navigation.redirect("/home")
                                }
                            } catch (e) {
                                setError(e?.message ?? "Unknown error");
                            }
                        }}
                        disabled={!email || !password || !firstName || !lastName || registerQuery.isLoading}
                    >
                        {registerQuery.isLoading && (
                            <Loader2 size={26} className={"animate-spin w-full"}/>
                        )}
                        {!registerQuery.isLoading && (
                            "Sign up"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
