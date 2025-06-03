import React from "react";
import {navigation} from "@/utils/navigation";
import {ChevronLeft, FileVideo2} from "lucide-react";
import {Browser} from "@capacitor/browser";

export default function EntityLayout({title, description, instructor, category, videoUrl, children }: {
    title: string,
    description?: string,
    instructor?: string,
    category?: string,
    videoUrl?: string,
    children: React.ReactNode
}) {
    return (
        <div className={"pt-4 min-h-screen flex flex-col"}>
            <button className={"flex flex-row items-center justify-between safe-area-x safe-area-t"}
                    onClick={() => navigation.goBack()}>
                <ChevronLeft size={24}/>
                <h2 className={"text-xl font-medium text-right"}>{title}</h2>
            </button>
            {description && (
                <div className={"mt-8 safe-area-x"}>
                    <h3 className={"text-sm font-bold text-dim-gray"}>Description</h3>
                    <p className={"text-sm text-[#101010]"}>
                        {description}
                    </p>
                </div>
            )}
            {(instructor || category) && (
                <div className={"flex flex-row items-center justify-between mt-4 safe-area-x"}>
                    {instructor && (
                        <div className={"flex flex-col"}>
                            <h3 className={"text-sm font-bold text-dim-gray"}>Instructor</h3>
                            <p className={"text-sm text-[#101010]"}>
                                {instructor}
                            </p>
                        </div>
                    )}
                    {category && (
                        <div className={"flex flex-col text-right"}>
                            <h3 className={"text-sm font-bold text-dim-gray"}>Category</h3>
                            <p className={"text-sm text-[#101010]"}>
                                {category[0].toUpperCase() + category.slice(1)}
                            </p>
                        </div>
                    )}
                </div>
            )}
            {videoUrl && (
                <button
                    className={"mt-4 safe-area-x flex flex-row items-center gap-2 text-blue-500"}
                    onClick={() => {
                        Browser.open({url: videoUrl, windowName: `${title}'s Video`})
                    }}
                >
                    <FileVideo2 size={18}/>
                    <h2 className={"font-medium"}>View Video</h2>
                </button>
            )}
            <div className={"max-h-full flex-1 border-t border-t-black mt-4 bg-[#D9D9D9] h-full"}>
                {children}
            </div>
        </div>
    )
}
