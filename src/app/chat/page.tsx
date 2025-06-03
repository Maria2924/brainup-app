"use client";
import EntityLayout from "@/components/layouts/EntityLayout";
import {MessageCircle} from "lucide-react";
import ChatFloat from "@/components/chat/ChatFloat";
import ChatTextBar from "@/components/chat/ChatTextBar";
import {ChatSession} from "@/types/chat";
import {useEffect, useState} from "react";
import UserReply from "@/components/chat/UserReply";
import AiReply from "@/components/chat/AiReply";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import useUser from "@/hooks/useUser";
import UniversalErrorCard from "@/components/UniversalErrorCard";

export default function ChatPage() {
    const { user } = useUser();
    const [chatSession, setChatSession] = useState<ChatSession>({
        session_key: "",
        reply: "",
        history: []
    });

    const [error, setError] = useState(null as string | null);
    const isThinking =
        chatSession.history.length > 0 &&
        chatSession.history[chatSession.history.length - 1].role === "model" &&
        chatSession.history[chatSession.history.length - 1].text === "$$[thinking]$$";

    useEffect(() => {
        return () => {
            if (chatSession.session_key != "") {
                fetchAuthenticated(user!, `/api/student/chat-session/delete?session_key=${chatSession.session_key}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    },
                }).then((c) => {
                    console.log(`Chat session ${chatSession} cleared.`)
                }).catch((e) => {
                    console.error("Failed to close chat session:", e);
                });
            }
        }
    }, []);

    const sendMessage = async (value: string) =>  {
        if (isThinking) {
            return;
        }

        setChatSession((session) => {
            return {
                ...session,
                history: [...session.history, {role: "user", text: value}, {role: "model", text: "$$[thinking]$$"}],
                reply: "Thinking..."
            }
        });

        try {
            const response = await fetchAuthenticated(user!, "/api/student/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify({
                    message: value,
                    session_key: chatSession.session_key === "" ? undefined : chatSession.session_key
                })
            });

            if (!response.ok) {
                const text = await response.text();
                if (text.includes("The model is overloaded")) {
                    setChatSession((session) => {
                        return {
                            ...session,
                            reply: "The model is currently overloaded. Please try again later.",
                            history: session.history.slice(0, -2)
                        }
                    });
                    setTimeout(() => {
                        sendMessage(value);
                    }, 1_500);
                    return;
                }

                setChatSession((session) => {
                    return {
                        ...session,
                        reply: "An error occurred while trying to chat with AI. Please try again later.",
                        history: session.history.slice(0, -2)
                    }
                });
                setError("An error occurred while trying to chat with AI. Please try again later.");
                return;
            }

            const session = await response.json() as ChatSession;
            setChatSession(session);
        } catch (e) {
            console.error("Failed to send message to AI:", e);
            setChatSession((session) => {
                return {
                    ...session,
                    reply: "An error occurred while trying to chat with AI. Please try again later.",
                    history: session.history.slice(0, -2)
                }
            });
            setError("An error occurred while trying to chat with AI. Please try again later.");
        }
    }
    return (
        <EntityLayout
            title={"Chat with AI"}
        >
            <div className={"h-full max-h-[80vh] overflow-y-scroll"}>
                <div className={"justify-center align-middle items-center flex mt-4"}>
                    <ChatFloat Icon={MessageCircle} text={"You are chatting with AI"}/>
                </div>
                <div className={"max-h-[60vh] flex flex-col gap-4 safe-area-x mt-10"}>
                    {error && <UniversalErrorCard error={error}/>}
                    {chatSession.history.map((message, index) => {
                        if (message.role === "user") {
                            return <UserReply message={message.text} key={`reply-${index}`}/>
                        }

                        if (message.role === "model" && message.text === "$$[thinking]$$") {
                            return <AiReply message={"Thinking..."} key={`reply-${index}`}/>
                        }

                        return <AiReply message={message.text} key={`reply-${index}`}/>
                    })}
                </div>
            </div>
            <ChatTextBar
                isThinking={isThinking}
                onSubmit={sendMessage}
            />
        </EntityLayout>
    )
}
