import {KeyboardAvoidingView, Platform, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import Logo from "../../../components/Logo";
import * as React from "react";
import {ArrowRight, Search, User} from "lucide-react-native";
import {useNavigation} from "@react-navigation/native";

export default function HomePage() {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            className={"flex-1 flex flex-col gap-2 justify-between"}
        >
            <View className="flex flex-col justify-between px-6 py-20">
                <View className={"flex flex-row justify-between"}>
                    <View className={"flex flex-row gap-4 items-center"}>
                        <TouchableOpacity className={"rounded-full bg-[#D9D9D9] p-1"} onPress={() => navigation.navigate('AuthNavigator', {
                            screen: "Login"
                        })}>
                            <User size={25} color={"#989898"}/>
                        </TouchableOpacity>
                        <View className={"flex flex-col"}>
                            <Text className={"font-insM leading-none text-[#BDBDBD] text-sm"}>Hey there,</Text>
                            <Text className={"font-insB text-[#393939]"}>Juan Dela Cruz</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Search size={25} color={"black"}/>
                    </TouchableOpacity>
                </View>
                <View className={"mt-16"}>
                    <View className={"flex flex-row justify-between items-center"}>
                        <Text className={"font-insB text-[#1F1F1F] text-xl"}>Course Overview</Text>
                        <TouchableOpacity>
                            <Text className={"font-insM leading-none text-[#7A7A7A] text-xs"}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View className={"flex flex-row justify-between gap-1 flex-wrap mt-6"}>
                        <TouchableOpacity className={"flex flex-col justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black w-[48%] bg-[#5C71C6]"}>
                            <View className={"flex flex-row justify-end"}>
                                <ArrowRight size={32} color={"#303030"}/>
                            </View>
                            <Text className={"text-xl leading-none text-[#303030] font-insM mt-12"}>Information Technology</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={"flex flex-col justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black w-[48%] bg-[#69C65C]"}>
                            <View className={"flex flex-row justify-end"}>
                                <ArrowRight size={32} color={"#303030"}/>
                            </View>
                            <Text className={"text-xl leading-none text-[#303030] font-insM mt-12"}>Programming</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
