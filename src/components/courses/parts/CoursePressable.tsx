import * as React from "react";
import {generateHSLColorFromText} from "../../../utils/colors";
import {Text, TouchableOpacity, View} from "react-native";
import {ArrowRight} from "lucide-react-native";

export type CoursePressablePressableProps = {
    text: string,
    onPress?: () => void,
    color?: string,
}

export default function CoursePressable({ text, onPress, color }: CoursePressablePressableProps) {
    const finalColor = color ?? generateHSLColorFromText(text);
    return (
        <TouchableOpacity
            onPress={onPress}
            className={"flex flex-col justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black w-[48%]"}
            style={{ backgroundColor: finalColor }}
        >
            <View className={"flex flex-row justify-end"}>
                <ArrowRight size={32} color={"#303030"}/>
            </View>
            <Text className={"text-xl leading-none text-[#303030] font-insM mt-12"}>{text}</Text>
        </TouchableOpacity>
    )
}
