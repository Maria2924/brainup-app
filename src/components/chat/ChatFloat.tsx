import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export default function ChatFloat({text,Icon}: {
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    text: string
}) {
    return (
        <div className={"p-2 px-4  bg-white rounded-full w-fit flex flex-row items-center gap-2 drop-shadow"}>
            <Icon size={18}/>
            <p className={"text-faded-black font-medium"}>{text}</p>
        </div>
    )
}
