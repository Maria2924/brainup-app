import {LucideProps, MessageCircle, User, UserRoundMinus, X} from "lucide-react";
import {UserWithAuthToken} from "@/types/auth";
import React, {ForwardRefExoticComponent, JSX, RefAttributes} from "react";
import {navigation} from "@/utils/navigation";

function MenuItem({ Icon, color, text, onClick }: {
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    color: string,
    text: string,
    onClick: () => void
}) {
    return (
        <button className={"flex flex-row items-center gap-2"} onClick={onClick}>
            <Icon size={24} color={color}/>
            <p className={"text-xl font-bold"} style={{color: color}}>{text}</p>
        </button>
    )
}

export default function Menu({user, signOut, onHide}: {
    user: UserWithAuthToken | null,
    signOut: () => void,
    onHide: () => void
}) {
    return (
        <div className={"safe-area-view"}>
            <div className={"mt-2 flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center gap-3"} key={"user-profile"}>
                    <div className={"bg-soft-gray rounded-full w-fit p-1"}>
                        <User size={26} className={"text-[#989898]"}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <p className={"text-faint-gray font-medium text-xs leading-snug"}>Hey there,</p>
                        <h2 className={"font-bold text-sm text-faint-black leading-none"}>{user?.name ?? "Loading"}</h2>
                    </div>
                </div>
                <button onClick={onHide}>
                    <X size={18}/>
                </button>
            </div>
            <div className={"flex flex-col gap-6 safe-area-y"}>
                <MenuItem Icon={MessageCircle} color={"purple"} text={"Chat with AI"} onClick={() => navigation.redirect("/chat")}/>
                <MenuItem Icon={UserRoundMinus} color={"red"} text={"Sign out"} onClick={signOut}/>
            </div>
        </div>
    )
}
