import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import * as React from "react";

export default function CoursesSubjectViewAllPartLayout({ subject, part, children, navigation }: { subject: string, part: string, children: React.ReactNode, navigation: any}) {
    return (
        <View
            className={"flex-1 flex flex-col gap-2 justify-between bg-[#D9D9D9]"}
        >
            <View className="flex flex-col justify-between px-6 py-20 pb-6 bg-white border-b border-b-black">
                <View className={"flex flex-row items-center justify-between"}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <ArrowLeft className={"text-black"} size={32} color={"black"}/>
                    </TouchableOpacity>
                    <Text className={"font-insB text-[#1F1F1F] text-xl"}>{subject} {part}</Text>
                </View>
            </View>
            <ScrollView
                className={"h-full flex-1"}
                contentContainerClassName={"flex flex-col justify-between"}
            >
                <View className={"py-6 px-6 h-fit"}>
                    <Text className={"font-insB text-[#1F1F1F] text-lg"}>{part}</Text>
                    <View className={"flex flex-col gap-4 mt-4"}>
                        {children}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
