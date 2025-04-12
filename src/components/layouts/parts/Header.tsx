import {Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft} from "lucide-react-native";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";

export default function LayoutHeader({ title, excludeBackButton = false }: { title: string, excludeBackButton?: boolean }) {
    const navigation = useNavigation<any>();
    return (
        <View className="flex flex-col justify-between px-6 py-20 pb-6 bg-white border-b border-b-black">
            <View className={"flex flex-row items-center justify-between"}>
                {!excludeBackButton && (
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <ArrowLeft className={"text-black"} size={32} color={"black"}/>
                    </TouchableOpacity>
                )}
                <Text className={"font-insB text-[#1F1F1F] text-xl"}>{title}</Text>
            </View>
        </View>
    )
}
