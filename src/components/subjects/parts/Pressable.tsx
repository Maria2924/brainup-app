import {Text, TouchableOpacity, View} from "react-native";
import {ArrowRight} from "lucide-react-native";
import * as React from "react";

export type SubjectPressableProps = {
    key?: string,
    text: string,
    children?: React.ReactNode,
    onPress?: () => void,
    color?: string
}
export default function SubjectPressable({text, children, color, onPress}: SubjectPressableProps) {
    const bgColor = color ?? (Math.floor(Math.random() * 10) > 5 ? "#C6915C" : "#5C9AC6");
    return (
        <TouchableOpacity
            onPress={onPress ?? (() => {})}
            className={`flex flex-row w-full justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black items-center bg-[${bgColor}]`}
        >
            <View className={"flex flex-col"}>
                <Text className={"text-xl leading-none text-[#303030] font-insM"}>{text}</Text>
                {children}
            </View>
            <ArrowRight size={32} color={"#303030"}/>
        </TouchableOpacity>
    )
}
