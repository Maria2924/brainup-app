import {navigation} from "@/utils/navigation";
import {ChevronLeft} from "lucide-react";
import React from "react";

type SecondaryEntityLayoutProps = {
    title: string,
    children?: React.ReactNode,
    includeBackButton?: boolean,
}

type SecondaryEntityLayoutHeaderProps = {
    title: string,
    description: string
}

function SecondaryEntityLayoutHeader(props: SecondaryEntityLayoutHeaderProps) {
    return (
        <div className={"flex flex-col p-4 bg-soft-gray border-y border-y-black"}>
            <h2 className={"text-faded-black font-bold"}>{props.title}</h2>
            <p className={"text-[#101010] text-sm"}>
                {props.description}
            </p>
        </div>
    )
}

function SecondaryEntityLayoutHeaderWithContinue(props: SecondaryEntityLayoutProps & {
    header: SecondaryEntityLayoutHeaderProps,
    onContinue: () => void
}) {
    return (
        <SecondEntityLayout title={props.title}>
            <div className={"flex flex-col justify-between flex-1 min-h-full"}>
                <SecondaryEntityLayoutHeader title={props.header.title} description={props.header.description}/>
                <div className={"w-full bg-white safe-area-view pb-4"}>
                    <button
                        className={"bg-primary p-2 rounded-xl font-semibold text-[#202020] w-full"}
                        onClick={props.onContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </SecondEntityLayout>
    )
}

function SecondEntityLayout(props: SecondaryEntityLayoutProps) {
    const {title, children, includeBackButton} = props;
    return (
        <div className={"pt-4 min-h-screen flex flex-col"}>
            {includeBackButton && (
                <button className={"flex flex-row items-center justify-between safe-area-x safe-area-t pb-4"}
                        onClick={() => navigation.goBack()}>
                    <ChevronLeft size={24}/>
                    <h2 className={"text-xl font-medium"}>{title}</h2>
                </button>
            )}
            {!includeBackButton && (
                <div className={"safe-area-x safe-area-t pb-4"}>
                    <h2 className={"text-xl font-medium"}>{title}</h2>
                </div>
            )}
            {children}
        </div>
    )
}

export const SimpleEntityLayout = {
    Layout: {
        WithHeaderAndContinue: SecondaryEntityLayoutHeaderWithContinue,
        Plain: SecondEntityLayout
    },
    Header: SecondaryEntityLayoutHeader
}
