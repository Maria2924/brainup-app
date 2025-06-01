import {AlertOctagonIcon, BadgeAlert} from "lucide-react";
import React from "react";

export default function UniversalErrorCard({ error }: { error: string | null }) {
    return (
        <>
            {error && (
                <div className={"p-4 rounded-lg border border-red-500 bg-red-300 text-red-700 border-dotted w-full flex flex-col gap-2"}>
                    <div className={"flex flex-row items-center gap-2"}>
                        <BadgeAlert size={24}/>
                        <h2 className={"font-bold"}>An error occurred</h2>
                    </div>
                    <p className={"text-sm font-medium"}>{error}</p>
                </div>
            )}
        </>
    )
}
