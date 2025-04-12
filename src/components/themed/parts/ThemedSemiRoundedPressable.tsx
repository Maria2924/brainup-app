import {Text, TouchableOpacity, View} from "react-native";
import { ArrowRight } from "lucide-react-native";
import * as React from "react";
import {generateHSLColorFromText} from "../../../utils/colors";

export type ThemedSemiRoundedPressableProps = {
    key?: string,
    text: string,
    children?: React.ReactNode,
    onPress?: () => void,
    color?: string,
    hideRightArrow?: boolean,
}

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
