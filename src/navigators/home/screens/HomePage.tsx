import {KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Search, User} from "lucide-react-native";
import {useNavigation} from "@react-navigation/native";
import {Courses} from "../../../components/courses/course";
import {
    JavaSubject,
    NetworkingFundamentalsSubject,
    OperatingSystemsSubject,
    PythonSubject
} from "../../../mocks/subjects";

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
                        <Courses.Pressable
                            text={"Information Technology"}
                            onPress={() => navigation.navigate('CourseNavigator', {
                                screen: "Course",
                                params: {
                                    course: {
                                        id: "it",
                                        name: "Information Technology",
                                        description: "Explore the essentials of computer systems, networks, hardware, software, and cybersecurity, focusing on the practical application, management, and support of technology within organizations.",
                                        subjects: [
                                            NetworkingFundamentalsSubject,
                                            OperatingSystemsSubject,
                                        ]
                                    }
                                }
                            })}
                        />
                        <Courses.Pressable
                            text={"Programming"}
                            onPress={() => navigation.navigate('CourseNavigator', {
                                screen: "Course",
                                params: {
                                    course: {
                                        id: "programming",
                                        name: "Programming",
                                        description: "Learn the fundamentals of coding, algorithms, and software development to build applications and solve computational problems using various programming languages.",
                                        subjects: [
                                            JavaSubject,
                                            PythonSubject,
                                        ]
                                    }
                                }
                            })}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
