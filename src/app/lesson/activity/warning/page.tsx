"use client";
import React from "react";
import {SimpleEntityLayout} from "@/components/layouts/SecondaryEntityLayout";
import {navigation} from "@/utils/navigation";

export default function AssessmentWarningPage() {
    return (
        <SimpleEntityLayout.Layout.WithHeaderAndContinue
            title={"Midterms Exam"}
            header={{
                title: "You are about to take an assessment.",
                description: "Closing the application, or going into background while the assessment is ongoing will " +
                    "result in a submission. You cannot retake the assessment once it is submitted.",
            }}
            onContinue={() => navigation.redirect("/subject/assessment/question")}
        />
    )
}
