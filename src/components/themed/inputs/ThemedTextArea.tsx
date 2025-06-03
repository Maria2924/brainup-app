"use client";
import React from "react";
import {Eye, EyeClosed} from "lucide-react";

export type ThemedTextAreaProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    bgColor?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    minLength?: number;
    maxLength?: number;
}
export default function ThemedTextArea(props: ThemedTextAreaProps) {
    const {
        label,
        className = "",
        inputClassName = "",
        required = false,
        placeholder = "Enter text here",
        bgColor = "bg-soft-gray",
        value,
        onChange,
        maxLength,
        minLength
    } = props;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <h4 className={"font-semibold text-xs"}>{label}{required && (
                    <span className={"text-faded-red ml-0.5"}>*</span>
                )}</h4>
            )}
            <div
                className={`w-full ${bgColor} bg-opacity-50 border border-faded-black flex flex-row rounded-lg items-center align-middle center justify-between p-2.5`}>
                <textarea
                    className={`w-full bg-transparent placeholder:text-[#767676] font-semibold ring-0 outline-0 outline-none ${inputClassName}`}
                    placeholder={placeholder}
                    value={value}
                    onInput={(e) => {
                        if (onChange) {
                            onChange((e.target as HTMLInputElement).value);
                        }
                    }}
                    minLength={minLength}
                    maxLength={maxLength}
                />
            </div>
        </div>
    )
}
