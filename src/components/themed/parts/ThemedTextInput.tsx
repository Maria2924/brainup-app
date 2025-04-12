import {Text, TextInput, View} from "react-native";
import * as React from "react";
import {useState} from "react";

export type ThemedTextInputProps = {
    title: string,
    placeholder: string,
    type: "password" | "text",
    required: boolean,
    wrapperClassName?: string,
    titleFontWeight?: "light" | "semibold" | "bold";
    defaultValue?: string,
    onChangeText?: (text: string) => void,
}

export default function ThemedTextInput(props: ThemedTextInputProps) {
    const [value, setValue] = useState(props.defaultValue)
    function onChangeText(text: string) {
        setValue(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    }

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
            <TextInput
                secureTextEntry={props.type === "password"}
                className={"bg-[#D9D9D9] px-4 py-3 border border-black rounded-lg text-black font-insB text-lg"}
                placeholder={props.placeholder}
                placeholderTextColor={"#767676"}
                allowFontScaling={false}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}
