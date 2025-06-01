"use client";
import {generateHSLColorFromText} from "@/utils/colors";
import {ArrowRight} from "lucide-react";

type CoursePressableProps = {
    text: string;
    onPress?: () => void;
    color?: string;
    className?: string;
}
export default function CoursePressable({ text, onPress, color, className }: CoursePressableProps) {
    const finalColor = color ?? generateHSLColorFromText(text);
    return (
        <div
            className={`flex flex-col h-full w-full p-2 rounded-tr-lg rounded-bl-lg border border-[#070707] justify-between hover-opacity ${className}`}
            style={{background: finalColor}}
            onClick={onPress}
        >
            <div className={"flex flex-row w-full justify-between"}>
                <div/>
                <ArrowRight size={32}/>
            </div>
            <h2 className={"font-medium text-[#303030] text-xl mt-6"}>{text.length > 25 ? text.slice(0, 25) + "..." : text}</h2>
        </div>
    )
}
