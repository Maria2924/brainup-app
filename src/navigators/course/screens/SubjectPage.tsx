import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../types";
import {KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import * as React from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Subject', 'CourseNavigator'>;
export default function SubjectPage(props: Props) {
    return (
        <>
            <View
                className={"flex-1 flex flex-col gap-2 justify-between bg-[#D9D9D9]"}
            >
                <View className="flex flex-col justify-between px-6 py-20 pb-6 bg-white border-b border-b-black">
                    <View className={"flex flex-row items-center justify-between"}>
                        <TouchableOpacity
                            onPress={() => props.navigation.pop()}
                        >
                            <ArrowLeft className={"text-black"} size={32} color={"black"}/>
                        </TouchableOpacity>
                        <Text className={"font-insB text-[#1F1F1F] text-xl"}>{props.route.params.subject.name}</Text>
                    </View>
                    <View className={"pt-12 h-fit mt-4"}>
                        <Text className={"font-insB text-[#1F1F1F] text-lg"}>Description</Text>
                        <Text className={"font-ins text-[#101010]"}>
                            {props.route.params.subject.description}
                        </Text>
                    </View>
                </View>
                <ScrollView
                    className={"h-full flex-1"}
                    contentContainerClassName={"flex flex-col justify-between"}
                >
                    <View className={"py-6 px-6 h-fit"}>
                        <Text className={"font-insB text-[#1F1F1F] text-lg"}>Assessments</Text>
                        <View className={"flex flex-col gap-4 mt-4"}>
                            {props.route.params.subject.assessments.map((assessment) => {
                                const color = Math.floor(Math.random() * 10) > 5 ? "#C6915C" : "#5C9AC6";
                                return (
                                    <TouchableOpacity
                                        key={assessment.id}
                                        className={`flex flex-row w-full justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black items-center bg-[${color}]`}
                                    >
                                        <Text className={"text-xl leading-none text-[#303030] font-insM"}>{assessment.name}</Text>
                                        <ArrowRight size={32} color={"#303030"}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View className={"py-6 px-6 border-t border-black h-fit"}>
                        <Text className={"font-insB text-[#1F1F1F] text-lg"}>Activities</Text>
                        <View className={"flex flex-col gap-4 mt-4"}>
                            {props.route.params.subject.activities.map((activity) => {
                                const color = Math.floor(Math.random() * 10) > 5 ? "#C6915C" : "#5C9AC6";
                                return (
                                    <TouchableOpacity
                                        key={activity.id}
                                        className={`flex flex-row w-full justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black items-center bg-[${color}]`}
                                    >
                                        <Text className={"text-xl leading-none text-[#303030] font-insM"}>{activity.name}</Text>
                                        <ArrowRight size={32} color={"#303030"}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View className={"py-6 px-6 border-t border-black h-fit"}>
                        <Text className={"font-insB text-[#1F1F1F] text-lg"}>Modules</Text>
                        <View className={"flex flex-col gap-4 mt-4"}>
                            {props.route.params.subject.modules.map((module) => {
                                const color = Math.floor(Math.random() * 10) > 5 ? "#C6915C" : "#5C9AC6";
                                return (
                                    <TouchableOpacity
                                        key={module.id}
                                        className={`flex flex-row w-full justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black items-center bg-[${color}]`}
                                    >
                                        <Text className={"text-xl leading-none text-[#303030] font-insM"}>{module.name}</Text>
                                        <ArrowRight size={32} color={"#303030"}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View className={"py-6 w-full px-6 border-t border-black bg-white"}>
                </View>
            </View>
        </>
    )
}
