import {Image} from "react-native";
import * as React from "react";

export default function Logo({ className }: {className?: string}) {
    return (
        <Image source={require("../../assets/images/brainup.png")} className={className ?? "w-[48] h-[48]"}/>
    )
}
