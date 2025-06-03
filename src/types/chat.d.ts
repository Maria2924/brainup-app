export type ChatSession = {
    session_key: string;
    reply: string;
    history: ChatMessage[];
}

export type ChatMessage = {
    role: "user" | "model";
    text: string;
}
