import ThemedTextInput from "@/components/themed/inputs/ThemedTextInput";
import {Loader2, SendHorizonal} from "lucide-react";
import {useState} from "react";

export default function ChatTextBar(props: { isThinking: boolean, onSubmit: (value: string) => void }) {
    const [value, setValue] = useState("");
    return (
        <div className={"flex p-2 bg-white w-full absolute bottom-0 py-4"}>
            <div className={"flex flex-row items-center w-full gap-3"}>
                <ThemedTextInput
                    label={""}
                    className={"w-full"}
                    placeholder={"Ask anything here"}
                    value={value}
                    onChange={setValue}
                    onSubmit={(v: string) => {
                        if (v.trim() === "") return;
                        props.onSubmit(v);
                        setValue("");
                    }}
                />
                <button
                    className={"flex items-center justify-center p-3 rounded-full bg-black disabled:opacity-50"}
                    disabled={props.isThinking}
                    onClick={() => {
                        if (value.trim() === "") return;
                        props.onSubmit(value);
                        setValue("");
                    }}
                >
                        <span className="flex items-center justify-center w-5 h-5">
                            {props.isThinking ? (
                                <Loader2 size={20} color={"white"} className={"animate-spin"}/>
                            ) : (
                                <SendHorizonal size={20} color="white"/>
                            )}
                        </span>
                </button>
            </div>
        </div>
    )
}
