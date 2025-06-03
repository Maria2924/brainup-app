import {Bot, Loader2} from "lucide-react";
import Markdown from "react-markdown";

type AiReplyProps = {
    message: string;
}
export default function AiReply({ message }: AiReplyProps) {
    return (
        <div className={"flex flex-row gap-2 drop-shadow"}>
            <div className="flex items-center justify-center p-3 rounded-full bg-faded-black w-8 h-8">
                            <span className="flex items-center justify-center">
                                <Bot size={20} color="white"/>
                            </span>
            </div>
            <div className={"flex flex-col gap-3 leading-relaxed bg-faded-black p-3 rounded-lg text-white max-w-[80%] break-words overflow-scroll"}>
                {message === "Thinking..." && (
                    <div className={"flex flex-row items-center gap-2 animate-pulse"}>
                        <Loader2 size={18} className={"animate-spin"}/>
                        <p>Thinking...</p>
                    </div>
                )}
                {message !== "Thinking..." && (
                    <Markdown>{message}</Markdown>
                )}
            </div>
        </div>
    )
}
