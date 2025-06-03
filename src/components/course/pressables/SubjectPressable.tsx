"use client";
import {generateHSLColorFromText} from "@/utils/colors";
import {ArrowRight} from "lucide-react";

type SubjectPressableProps = {
    text: string;
    onPress?: () => void;
    color?: string;
    className?: string;
    hideIcon?: boolean;
}
export default function SubjectPressable({ text, onPress, color, className, hideIcon = false}: SubjectPressableProps) {
    const finalColor = color ?? generateHSLColorFromText(text);
    return (
        <div
            className={`flex flex-row items-center justify-between h-full w-full p-2 px-4 rounded-tr-lg rounded-bl-lg border border-[#070707] hover-opacity ${className}`}
            style={{background: finalColor}}
            onClick={onPress}
        >
            <h2 className={"font-medium text-[#303030] text-xl"}>{text}</h2>
            {!hideIcon && (
                <ArrowRight size={32}/>
            )}
        </div>
    )
}
