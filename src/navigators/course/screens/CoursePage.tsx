import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../types";
import {KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import * as React from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Course', 'CourseNavigator'>;
export default function CoursePage(props: Props) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            className={"flex-1 flex flex-col gap-2 justify-between bg-[#D9D9D9]"}
            keyboardVerticalOffset={-200}
        >
            <View className="flex flex-col justify-between px-6 py-20 pb-6 bg-white border-b border-b-black">
                <View className={"flex flex-row items-center justify-between"}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <ArrowLeft className={"text-black"} size={32} color={"black"}/>
                    </TouchableOpacity>
                    <Text className={"font-insB text-[#1F1F1F] text-xl"}>{props.route.params.course.name}</Text>
                </View>
                <View className={"pt-12 h-fit mt-4"}>
                    <Text className={"font-insB text-[#1F1F1F] text-lg"}>Description</Text>
                    <Text className={"font-ins text-[#101010]"}>
                        {props.route.params.course.description}
                    </Text>
                </View>
            </View>
            <View className="flex flex-col justify-between">
                <View className={"pt-6 h-full px-6"}>
                    <Text className={"font-insB text-[#1F1F1F] text-lg"}>Subjects</Text>
                    <View className={"flex flex-col gap-4 mt-4"}>
                        {props.route.params.course.subjects.map((subject) => {
                            const color = Math.floor(Math.random() * 10) > 5 ? "#C6915C" : "#5C9AC6";
                            return (
                                <TouchableOpacity
                                    key={subject.id}
                                    onPress={() => props.navigation.navigate('CourseNavigator', {
                                        screen: "Subject",
                                        params: {
                                            subject: {
                                                id: subject.id,
                                                name: subject.name,
                                                description: "Java is a widely used, object-oriented, " +
                                                    "platform-independent programming language and software platform, " +
                                                    "known for its simplicity, efficiency, and security, used to create  " +
                                                    "various applications, from Android apps to enterprise software",
                                                assessments: [
                                                    {id: "midterms", name: "Midterms Exam"},
                                                    {id: "pretest", name: "Pre-test"},
                                                ],
                                                activities: [
                                                    {id: "calc", name: "Calculator App"},
                                                    {id: "console-log", name: "Console Logging"}
                                                ],
                                                modules: [
                                                    {id: "java-basics", name: "Syntax of Java"},
                                                    {id: "java-advanced", name: "Setting up Java"},
                                                ]
                                            }
                                        }
                                    })}
                                    className={`flex flex-row w-full justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black items-center bg-[${color}]`}
                                >
                                    <Text className={"text-xl leading-none text-[#303030] font-insM"}>{subject.name}</Text>
                                    <ArrowRight size={32} color={"#303030"}/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>)
}
