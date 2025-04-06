import {Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedBirthDateInput from "../../../components/ThemedBirthDateInput";
import { useNavigation } from "@react-navigation/native";

export default function RegisterPage() {
    const navigator = useNavigation();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            className={"flex-1 flex flex-col gap-2 justify-between"}
        >
            <View className="flex flex-col justify-between px-6 py-20">
                <View className={"flex flex-row gap-2 items-center"}>
                    <TouchableOpacity
                        onPress={() => navigator.navigate('AuthNavigator', {
                            screen: "Login"
                        })}
                    >
                        <ArrowLeft className={"text-black"} size={32} color={"black"}/>
                    </TouchableOpacity>
                </View>
                <View className={"pt-12 h-full"}>
                    <Text className={"text-[#1F1F1F] font-insB text-4xl"}>Welcome!</Text>
                    <Text className={"text-[#1F1F1F] font-ins text-xl"}>
                        Let’s help you get started first by getting to
                        know you first!
                    </Text>
                    <View className={"flex flex-col gap-4 pt-4"}>
                        <ThemedTextInput
                            title={"First Name"}
                            placeholder={"Juan"}
                            type={"text"}
                            required={true}
                            titleFontWeight={"semibold"}
                        />
                        <ThemedTextInput
                            title={"Middle Name"}
                            placeholder={"Dela (optional)"}
                            type={"text"}
                            required={false}
                            titleFontWeight={"semibold"}
                        />
                        <ThemedTextInput
                            title={"Last Name"}
                            placeholder={"Cruz"}
                            type={"text"}
                            required={true}
                            titleFontWeight={"semibold"}
                        />
                        <ThemedBirthDateInput title={"Date of Birth"} required={true}/>
                    </View>
                    <View className={"absolute bottom-0 w-full mb-20"}>
                        <TouchableOpacity>
                            <View className={"w-full bg-[#7BD4F7] p-2 rounded-xl"}>
                                <Text className={"font-insS text-lg text-[#202020] text-center"}>Sign up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
