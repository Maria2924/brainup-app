import { Text, TouchableOpacity, View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import * as React from "react";

export type SubjectPressableProps = {
    key?: string,
    text: string,
    children?: React.ReactNode,
    onPress?: () => void,
    color?: string
}

const colorOption1 = "#C6915C";
const colorOption2 = "#5C9AC6";

const simpleStringHash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
};

export default function SubjectPressable({ text, children, color, onPress }: SubjectPressableProps) {
    const textHash = simpleStringHash(text);
    const colorFromText = (textHash % 2 === 0) ? colorOption1 : colorOption2;
    const finalBgColor = color ?? colorFromText;
    return (
        <TouchableOpacity
            onPress={onPress ?? (() => {})}
            style={{ backgroundColor: finalBgColor }}
            className={`flex flex-row w-full justify-between p-4 rounded-tr-lg rounded-bl-lg border border-black items-center`}
        >
            <View className={"flex flex-col"}>
                <Text className={"text-xl leading-none text-[#303030] font-insM"}>{text}</Text>
                {children}
            </View>
            <ArrowRight size={32} color={"#303030"}/>
        </TouchableOpacity>
    )
}
