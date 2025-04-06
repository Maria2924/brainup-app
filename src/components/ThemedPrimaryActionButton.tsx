import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export type ThemedPrimaryActionButtonProps = {
    children: React.ReactNode,
    className?: string,
    onClick?: () => void,
}

function Container({ children, className, onClick }: ThemedPrimaryActionButtonProps) {
    return (
        <TouchableOpacity onPress={onClick ?? (() => {})}>
            <View className={`w-full bg-[#7BD4F7] p-2 rounded-xl ${className ?? ""}`}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

function TextElement({ children, className }: { children: React.ReactNode, className?: string }) {
    return (<Text className={`font-insS text-lg text-[#202020] text-center ${className ?? ""}`}>{children}</Text>)
}

export const ThemedPrimaryActionButton = {
    Container,
    Text: TextElement
}
