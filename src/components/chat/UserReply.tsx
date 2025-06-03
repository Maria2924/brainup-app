import {User} from "lucide-react";

type UserReplyProps = {
    message: string;
}
export default function UserReply({ message }: UserReplyProps) {
    return (
        <div className={"flex flex-row-reverse gap-2 drop-shadow"}>
            <div className="flex items-center justify-center p-3 rounded-full bg-white w-8 h-8">
                <span className="flex items-center justify-center">
                    <User size={20} color="black"/>
                </span>
            </div>
            <div className={"flex bg-white p-3 rounded-lg text-faded-black"}>
                <p>{message}</p>
            </div>
        </div>
    )
}
