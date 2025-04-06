import {Text, TouchableOpacity, View} from "react-native";
import * as React from "react";

export type SubjectSectionProps = {
    title: string,
    children?: React.ReactNode,
    includeTopBorder?: boolean,
    onPressViewAll?: () => void
}
export default function SubjectSection({ title, children, includeTopBorder, onPressViewAll}: SubjectSectionProps) {
    return (
        <View className={`py-6 px-6 h-fit ${includeTopBorder && "border-t border-black"}`}>
            <View className={`flex flex-row items-center justify-between`}>
                <Text className={"font-insB text-[#1F1F1F] text-lg"}>{title}</Text>
                {onPressViewAll && (
                    <TouchableOpacity onPress={onPressViewAll}>
                        <Text className={"font-insM leading-none text-[#7A7A7A] text-xs"}>View All</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View className={"flex flex-col gap-4 mt-4"}>
                {children}
            </View>
        </View>
    )
}
