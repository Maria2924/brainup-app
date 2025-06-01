"use client";
import EntityLayout from "@/components/layouts/EntityLayout";
import {useSearchParams} from "next/navigation";
import {Course} from "@/components/course/course";
import React from "react";

export default function Entity() {
    const searchParams = useSearchParams();
    const subject = searchParams.get("subject");
    const type = searchParams.get("type");

    if (!subject || !type) {
        return (
            <div>
                <text>invalid type.</text>
            </div>
        )
    }

    const normalizedType = type === "activity" ? "Acitivites" : type === "module" ? "Modules" : "Assessments";
    return (
        <EntityLayout title={subject + " " + normalizedType}>
            <div className={"mt-4 flex flex-col gap-4 p-4"}>
                <Course.Subject text={"Java"}/>
                <Course.Subject text={"Python"}/>
            </div>
        </EntityLayout>
)
}
