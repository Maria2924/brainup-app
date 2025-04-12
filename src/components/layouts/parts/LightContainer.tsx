import React from "react";
import {View} from "react-native";

export const LightContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container backgroundColor={"bg-white"}>
            {children}
        </Container>
    )
}

export const GrayContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container backgroundColor={"bg-[#D9D9D9]"}>
            {children}
        </Container>
    )
}

export function Container({ children, backgroundColor }: { children: React.ReactNode, backgroundColor: string }) {
    return (
        <View className={`flex-1 flex flex-col justify-between ${backgroundColor}`}>
            {children}
        </View>
    )
}

