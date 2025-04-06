import {Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";

export default function LoginPage() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            className={"flex-1 flex flex-col gap-2 bg-[#1E1E1E] justify-between"}
        >
            <View className="h-[60vh] flex flex-col justify-between px-6 py-[4rem]">
                <View className={"flex flex-row gap-2 items-center"}>
                    <Image source={require("../../../../assets/images/brainup.png")} className={"w-[48] h-[48]"}/>
                    <Text className={"text-[#7BD4F7] font-insB text-xl"}>BrainUp</Text>
                </View>
                <View className={""}>
                    <Text className={"text-white font-insS text-3xl"}>
                        Enhance your skills like never before.
                    </Text>
                    <Text className={"text-white font-ins text-sm"}>
                        With BrainUp’s intelligent and assistive features,
                        you can become a champion in no time!
                    </Text>
                </View>
                <View/>
            </View>
            <View className={"bg-white rounded-t-3xl border-2 border-[#7BD4F7] py-4 px-6 h-full pb-safe-offset-8"}>
                <Text className={"text-[#1F1F1F] font-insB text-2xl"}>Sign in</Text>
                <View className={"flex flex-col gap-4 pt-4"}>
                    <View className={"flex flex-col gap-2"}>
                        <Text className={"text-black font-ins text-sm"}>Email Address</Text>
                        <TextInput
                            className={"bg-[#D9D9D9] px-4 py-3  border border-black rounded-lg text-black font-insB text-lg placeholder:text-[#767676]"}
                            placeholder={"example@mail.com"}
                        />
                    </View>
                    <View className={"flex flex-col gap-2"}>
                        <Text className={"text-black font-ins text-sm"}>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            className={"bg-[#D9D9D9] px-4 py-3 border border-black rounded-lg text-black font-insB text-lg placeholder:text-[#767676]"}
                            placeholder={"********"}
                        />
                    </View>
                    <TouchableOpacity>
                        <View className={"w-full bg-[#7BD4F7] p-2 rounded-xl"}>
                            <Text className={"font-insS text-lg text-[#202020] text-center"}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
