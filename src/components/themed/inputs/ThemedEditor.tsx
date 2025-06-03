"use client";
import React from "react";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism.css';
import {SendHorizonal} from "lucide-react";

export type ThemedEditorProps = {
    language: "java" | "kotlin" | "python" | "c" | "cpp";
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

const grammarMap = {
    java: languages.java,
    kotlin: languages.kotlin,
    python: languages.python,
    c: languages.c,
    cpp: languages.cpp
}

export default function ThemedEditor(props: ThemedEditorProps) {
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
                <Editor
                    value={value ?? ""}
                    onValueChange={code => {
                        if (onChange) {
                            onChange(code);
                        }
                    }}
                    highlight={code => highlight(code, grammarMap[props.language], props.language)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                    className={"w-full h-[12rem]"}
                    textareaClassName={`w-full bg-transparent ring-0 outline-0 outline-none h-full ${inputClassName}`}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    minLength={minLength}
                />
            </div>
        </div>
    )
}
