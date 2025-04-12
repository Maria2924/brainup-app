import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft} from "lucide-react-native";
import {useNavigation} from "@react-navigation/native";

export default function CoursesMajorPartLayout({ title, description, children }: { title: string, description?: string, children: React.ReactNode}) {
    const navigation = useNavigation<any>();
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
                    <Text className={"font-insB text-[#1F1F1F] text-xl"}>{title}</Text>
                </View>
                {description && (
                    <View className={"pt-2 h-fit mt-4"}>
                        <Text className={"font-insB text-[#1F1F1F] text-lg"}>Description</Text>
                        <Text className={"font-ins text-[#101010]"}>
                            {description}
                        </Text>
                    </View>
                )}
            </View>
            <ScrollView
                className={"h-full flex-1"}
                contentContainerClassName={"flex flex-col justify-between"}
            >
                {children}
            </ScrollView>
            <View className={"py-6 w-full px-6 border-t border-black bg-white"}>
            </View>
        </View>
    )
}
