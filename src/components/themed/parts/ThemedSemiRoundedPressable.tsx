import {Text, TouchableOpacity, View} from "react-native";
import { ArrowRight } from "lucide-react-native";
import * as React from "react";

export type ThemedSemiRoundedPressableProps = {
    key?: string,
    text: string,
    children?: React.ReactNode,
    onPress?: () => void,
    color?: string,
    hideRightArrow?: boolean,
}

const simpleStringHash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
};

const generateHSLColorFromText = (str: string): string => {
    const hash = simpleStringHash(str);
    const hue = Math.abs(hash) % 360;
    const saturation = 50 + (Math.abs(hash >> 8) % 31);
    const lightness = 75 + (Math.abs(hash >> 16) % 16);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


export default function ThemedSemiRoundedPressable({ text, children, color, onPress, hideRightArrow = false }: ThemedSemiRoundedPressableProps) {
    const colorFromText = generateHSLColorFromText(text);
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
            {!hideRightArrow && (
                <ArrowRight size={32} color={"#303030"}/>
            )}
        </TouchableOpacity>
    )
}
