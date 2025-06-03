"use client";
import {SimpleEntityLayout} from "@/components/layouts/SecondaryEntityLayout";
import React from "react";
import {Question} from "@/types/question";
import SubjectPressable from "@/components/course/pressables/SubjectPressable";

export default function AssessmentQuestionPage() {
    const questions = [
        {
            question: "It is a software that can be used to write Java applications.",
            lesson_id: "",
            options: {
                "option1":"Webstorm",
                "option2":"IntelliJ IDEA",
                "option3":"PhpStorm",
                "option4":"RustDesk"
            }
        }
    ] as Question[];
    return (
        <SimpleEntityLayout.Layout.Plain
            title={"Activity"}
            includeBackButton={false}
        >
            <div className={"flex flex-col flex-1 min-h-full"}>
                <SimpleEntityLayout.Header title={"Question 1."} description={"It is a software that can be used to write Java applications."}/>
                <div className={"min-h-full flex-1 w-full bg-soft-gray safe-area-view pb-4 flex flex-col gap-2"}>
                    {Object.entries(questions[0].options).map((option) => {

                        return (
                            <SubjectPressable
                                key={`option-${option[0]}`}
                                text={option[1] as string}
                            />
                        )
                    })}
                </div>
            </div>
        </SimpleEntityLayout.Layout.Plain>
    )
}
