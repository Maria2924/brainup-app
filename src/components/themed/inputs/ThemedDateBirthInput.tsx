"use client";
import React from "react";
import {Themed} from "@/components/themed";
export type ThemedDateBirthInputProps = {
    label: string;
    placeholder?: [string, string, string];
    className?: string;
    required?: boolean;
    value?: [number, number, number];
    onChange?: (value: [number, number, number]) => void;
}
export default function ThemedDateBirthInput(props: ThemedDateBirthInputProps) {
    const {
        label,
        className = "",
        required = false,
        placeholder = ["Month", "Day", "Year"],
        value = [0, 0, 0],
        onChange
    } = props;
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <h4 className={"font-semibold text-xs"}>{label}{required && (
                <span className={"text-faded-red ml-0.5"}>*</span>
            )}</h4>
            <div className={"flex flex-row gap-4"}>
                {value.map((v, index) => (
                    <Themed.TextInput
                        key={`dbi-${index}`}
                        type={"number"}
                        placeholder={placeholder[index]}
                        value={v === 0 ? "" : v.toString()}
                        className={"w-[40%]"}
                        inputClassName={"text-center placeholder:text-center"}
                        onChange={(v) => {
                            const newValue = [...value];
                            newValue[index] = parseInt(v);
                            if (onChange) {
                                if (index === 0) {
                                    newValue[0] = Math.min(Math.max(newValue[0], 1), 12);
                                } else if (index === 1) {
                                    newValue[1] = Math.min(Math.max(newValue[1], 1), 31);
                                } else if (index === 2) {
                                    newValue[2] = Math.min(newValue[2], new Date().getFullYear());
                                }
                                onChange(newValue as [number, number, number]);
                            }
                        }}
                        min={index === 0 ? 1 : index === 1 ? 1 : 1900}
                        max={index === 0 ? 12 : index === 1 ? 31 : new Date().getFullYear()}
                        minLength={index === 0 ? 1 : index === 1 ? 1 : 4}
                        maxLength={index === 0 ? 2 : index === 1 ? 2 : 4}
                    />
                ))}
            </div>
        </div>
    )
}
