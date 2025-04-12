import {KeyboardAvoidingView, Platform, Text, View} from "react-native";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import Logo from "../../../components/Logo";
import {Themed} from "../../../components/themed/Themed";

export default function LoginPage() {
    const navigator = useNavigation<any>();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            className={"flex-1 flex flex-col gap-2 bg-[#1E1E1E] justify-between"}
        >
            <View className="h-[60vh] flex flex-col justify-between px-6 py-[4rem]">
                <View className={"flex flex-row gap-2 items-center"}>
                    <Logo/>
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
                    <Themed.TextInput title={"Email Address"} placeholder={"example@mail.com"} type={"text"} required={false}/>
                    <Themed.TextInput title={"Password"} placeholder={"********"} type={"password"} required={false}/>
                    <Themed.PrimaryActionButton.Container onClick={() => navigator.navigate('AuthNavigator', { screen: "Register"})}>
                        <Themed.PrimaryActionButton.Text>Continue</Themed.PrimaryActionButton.Text>
                    </Themed.PrimaryActionButton.Container>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
