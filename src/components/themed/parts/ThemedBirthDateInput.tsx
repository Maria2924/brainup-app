import {Text, TextInput, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";

export type ThemedTextInputProps = {
    title: string,
    required: boolean,
    wrapperClassName?: string,
    titleFontWeight?: "light" | "semibold" | "bold";
    defaultValue?: { month: number, day: number, year: number },
    onChange?: (value: { month: number, day: number, year: number }) => void,
}

export default function ThemedBirthDateInput(props: ThemedTextInputProps) {
    const [value, setValue] = useState(props.defaultValue ?? { month: 0, day: 0, year: 0 })
    function onChangeText(value: { month?: number, day?: number, year?: number }) {
        setValue((curr) => {
            return { ...curr, ...value }
        });
    }

    useEffect(() => {
        if (props.onChange) {
            props.onChange(value);
        }
    }, [value]);

    const fontWeight = React.useMemo(() => {
        if (!props.titleFontWeight) {
            return "font-ins";
        }
        return (
            props.titleFontWeight === "bold" ? "font-insB" :
                props.titleFontWeight === "semibold" ? "font-insS" : "font-ins"
        )
    }, [props.titleFontWeight]);

    return (
        <View className={`flex flex-col gap-2 ${props.wrapperClassName ?? ""}`}>
            <Text className={`text-black text-sm ${fontWeight}`}>
                {props.title}
                {props.required ? <Text className={"text-[#FF9090] font-ins"}>*</Text> : null}
            </Text>
            <View className={"flex flex-row gap-2 items-center"}>
                <TextInput
                    className={"bg-[#D9D9D9] w-24 text-center px-4 py-3 border border-black rounded-lg text-black font-insB text-lg placeholder:text-[#767676]"}
                    placeholder={"Month"}
                    keyboardType={"decimal-pad"}
                    returnKeyType={"next"}
                    value={value.month === 0 ? "" : value.month.toString()}
                    onChangeText={(text) => {
                        if (!Number.isNaN(text) && text.length > 0 && text !== "") {
                            const month = Number.parseInt(text);
                            if (month > 12 || month < 1) {
                                onChangeText({ month: 12 })
                                return;
                            }

                            onChangeText({ month })
                        } else if (text === ""|| text.length <= 0) {
                            onChangeText({month: 0})
                        }
                    }}
                    maxLength={2}
                />
                <TextInput
                    className={"bg-[#D9D9D9] w-20 text-center  px-4 py-3 border border-black rounded-lg text-black font-insB text-lg placeholder:text-[#767676]"}
                    placeholder={"Day"}
                    keyboardType={"numeric"}
                    returnKeyType={"next"}
                    value={value.day === 0 ? "" : value.day.toString()}
                    onChangeText={(text) => {
                        if (!Number.isNaN(text) && text.length > 0 && text !== "") {
                            const day = Number.parseInt(text);
                            if (day > 31 || day < 1) {
                                return;
                            }

                            onChangeText({ day })
                        }  else if (text === ""|| text.length <= 0) {
                            onChangeText({day: 0})
                        }
                    }}
                    maxLength={2}
                />
                <TextInput
                    className={"bg-[#D9D9D9] w-32 text-center px-4 py-3 border border-black rounded-lg text-black font-insB text-lg placeholder:text-[#767676]"}
                    placeholder={"Year"}
                    keyboardType={"decimal-pad"}
                    returnKeyType={"send"}
                    value={value.year === 0 ? "" : value.year.toString()}
                    onChangeText={(text) => {
                        if (!Number.isNaN(text) && text.length > 0 && text !== "") {
                            const year = Number.parseInt(text.replace(/[^0-9]/g, ''));
                            if (year > 1000 && year < 1900) {
                                return;
                            }

                            if (year > new Date().getFullYear() - 10) {
                                onChangeText({ year: new Date().getFullYear() - 10 })
                                return;
                            }

                            onChangeText({ year })
                        } else if (text === ""|| text.length <= 0) {
                            onChangeText({year: 0})
                        }
                    }}
                    maxLength={4}
                />
            </View>
        </View>
    )
}
