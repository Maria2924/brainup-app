"use client";
import React from "react";
import {Eye, EyeClosed} from "lucide-react";

export type ThemedTextInputProps = {
    label?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
    inputClassName?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}
export default function ThemedTextInput(props: ThemedTextInputProps) {
    const {
        label,
        className = "",
        inputClassName = "",
        required = false,
        placeholder = "Enter text here",
        type = "text",
        value,
        onChange,
        min,
        max,
        maxLength,
        minLength
    } = props;

    const [showPassword, setShowPassword] = React.useState(type === "text");

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <h4 className={"font-semibold text-xs"}>{label}{required && (
                    <span className={"text-faded-red ml-0.5"}>*</span>
                )}</h4>
            )}
            <div
                className={"w-full bg-soft-gray bg-opacity-50 border border-faded-black flex flex-row rounded-lg items-center align-middle center justify-between p-2.5"}>
                <input
                    className={`${type === "password" ? "w-[90%]" : "w-full"} bg-transparent placeholder:text-[#767676] font-semibold ring-0 outline-0 outline-none ${inputClassName}`}
                    placeholder={placeholder}
                    type={showPassword ? (type === "password" ? "text" : type) : type}
                    value={value}
                    onInput={(e) => {
                        if (onChange) {
                            onChange((e.target as HTMLInputElement).value);
                        }
                    }}
                    min={min}
                    max={max}
                    minLength={minLength}
                    maxLength={maxLength}
                    inputMode={type === "number" ? "numeric" : "text"}
                />
                {type === "password" && (
                    <button onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword && <EyeClosed size={18}/>}
                        {!showPassword && <Eye size={18}/>}
                    </button>
                )}
            </div>
        </div>
    )
}
