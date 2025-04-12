import {KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {ArrowRight, Search, User} from "lucide-react-native";
import {useNavigation} from "@react-navigation/native";

export default function HomePage() {
    const navigation = useNavigation<any>();
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
                    <Text className={"font-insB text-[#1F1F1F] text-xl"}>Course Overview</Text>
                    <View className={"flex flex-row justify-between gap-1 flex-wrap mt-6"}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CourseNavigator', {
                                screen: "Course",
                                params: {
                                    course: {
                                        id: "it",
                                        name: "Information Technology",
                                        description: "Information Technology is a subject that is a subject " +
                                            "of another subject of information that  is all about" +
                                            "information and nothing more than technological " +
                                            "information.",
                                        subjects: [
                                            {id: "java", name: "Java"},
                                            {id: "python", name: "Python"},
                                        ]
                                    }
                                }
                            })}
                            className={"flex flex-col justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black w-[48%] bg-[#5C71C6]"}
                        >
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
