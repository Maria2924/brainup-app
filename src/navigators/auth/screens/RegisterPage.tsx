import {KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {ArrowLeft} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import {Themed} from "../../../components/themed/Themed";

export default function RegisterPage() {
    const navigator = useNavigation<any>();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            className={"flex-1 flex flex-col gap-2 justify-between"}
            keyboardVerticalOffset={-200}
        >
            <View className="flex flex-col justify-between px-6 py-20">
                <View className={"flex flex-row gap-2 items-center"}>
                    <TouchableOpacity
                        onPress={() => navigator.pop()}
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
                        <Themed.TextInput
                            title={"First Name"}
                            placeholder={"Juan"}
                            type={"text"}
                            required={true}
                            titleFontWeight={"semibold"}
                        />
                        <Themed.TextInput
                            title={"Middle Name"}
                            placeholder={"Dela (optional)"}
                            type={"text"}
                            required={false}
                            titleFontWeight={"semibold"}
                        />
                        <Themed.TextInput
                            title={"Last Name"}
                            placeholder={"Cruz"}
                            type={"text"}
                            required={true}
                            titleFontWeight={"semibold"}
                        />
                        <Themed.BirthDateInput title={"Date of Birth"} required={true}/>
                    </View>
                    <View className={"absolute bottom-0 w-full mb-20"}>
                        <Themed.PrimaryActionButton.Container onClick={() => navigator.navigate('HomeNavigator')}>
                            <Themed.PrimaryActionButton.Text>Sign up</Themed.PrimaryActionButton.Text>
                        </Themed.PrimaryActionButton.Container>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
