"use client";
import React, {useEffect, useRef, useState} from "react";
import {Activity} from "@/types/course";
import {useSearchParams} from "next/navigation";
import {navigation} from "@/utils/navigation";
import {SimpleEntityLayout} from "@/components/layouts/SecondaryEntityLayout";
import SubjectPressable from "@/components/course/pressables/SubjectPressable";
import {Loader2} from "lucide-react";
import {Themed} from "@/components/themed";
import UniversalErrorCard from "@/components/UniversalErrorCard";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import useUser from "@/hooks/useUser";

export default function ActivityPage() {
    const {user} = useUser();

    const queryParams = useSearchParams();
    const course = queryParams.get("course");
    const id = queryParams.get("id");

    const [activities, setActivities] = useState(null as Activity[] | null);
    const [currentActivity, setCurrentActivity] = useState(0);
    const [confirmedWarning, setConfirmedWarning] = useState(false);

    const answer = useRef(null as string | null);
    const [statefulAnswer, setStatefulAnswer] = useState(null as string | null);

    const [status, setStatus] = useState("ok" as "loading" | "ok" | "error");
    const [error, setError] = useState(null as string | null);

    const activity = activities ? activities[currentActivity] : null;

    useEffect(() => {
        const rawActivity = window.localStorage.getItem(`course[${course}]:activity[${id}]`);
        if (rawActivity == null) {
            console.warn("Activity data not found in local storage, redirecting to lesson page.", course, id, rawActivity);
            navigation.replace(`/lesson?course=${course}&id=${id}`);
            return;
        }
        const activity = JSON.parse(rawActivity) as Activity[];
        if (activity.length === 0) {
            console.warn("Activity is empty, redirecting to lesson page.");
            navigation.replace(`/lesson?course=${course}&id=${id}`);
            return;
        }
        if (activity.find((v) => v.user_answered) != null) {
            const lastAnswered = activity.findIndex((v) => !v.user_answered);
            console.log(lastAnswered, activity.length)
            if (lastAnswered === -1) {
                navigation.replace(`/lesson?course=${course}&id=${id}`);
                return;
            }
            setCurrentActivity(lastAnswered);
        }
        console.log(activity)
        setActivities(activity);
    }, []);

    const nextQuestion = () => {
        const currentAnswer = answer.current;
        setStatus("loading");
        answer.current = null;

        const formData = new FormData();
        let submittedAnswer = currentAnswer!;
        if (activity!.type === "multiple_choice") {
            submittedAnswer = "[" + currentAnswer!.split("$l;").map((v) => `'${v}'`).join(",") + "]";
        }
        formData.set("answer", submittedAnswer);
        fetchAuthenticated(user!, `/api/student/enrolled-course/${course!}/lesson/${id}/question/${activity!.id}/submit-answer`, {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({ answer: submittedAnswer }),
            method: "POST"
        }).then((res) => {
            if (!res.ok) {
                setStatus("error");
                setError("Failed to submit answer. Please try again later.");
                res.text()
                    .then((text) => {
                        console.error("Failed to submit answer:", res.status, res.statusText, text);
                    })
                    .catch((e) => {
                        console.error("Failed to submit answer:", res.status, res.statusText, e);
                    });
                return;
            }

            if (currentActivity >= (activities?.length ?? 0) - 1) {
                navigation.replace(`/lesson?course=${course}&id=${id}`);
                return;
            }

            setStatus("ok");
            setStatefulAnswer(null);
            setCurrentActivity(currentActivity + 1);
        })
    }

    if (!confirmedWarning) {
        return (
            <SimpleEntityLayout.Layout.WithHeaderAndContinue
                title={"Activity"}
                header={{
                    title: "You are about to take an activity.",
                    description: "Closing the application, or going into background while the activity is ongoing will " +
                        "result in a submission. You cannot retake the activity once it is submitted.",
                }}
                onContinue={() => setConfirmedWarning(true)}
            />
        )
    }

    if (activities == null || activity == null) {
        return (
            <SimpleEntityLayout.Layout.Plain
                title={"Activity"}
                includeBackButton={false}
            >
                <div className={"flex items-center justify-center mt-4"}>
                    <Loader2 className={"animate-spin"} size={24}/>
                </div>
            </SimpleEntityLayout.Layout.Plain>
        )
    }

    return (
        <SimpleEntityLayout.Layout.Plain
            title={"Activity"}
            includeBackButton={error != null}
        >
            <div className={"flex flex-col flex-1 min-h-full"}>
                <SimpleEntityLayout.Header
                    title={`Question ${currentActivity + 1}.`}
                    description={activities[currentActivity].question}
                />
                <div className={"min-h-full flex-1 w-full bg-soft-gray safe-area-view pt-4 pb-4 flex flex-col gap-2"}>
                    {error && (
                        <UniversalErrorCard error={error}/>
                    )}
                    {status === "loading" && (
                        <div className={"flex items-center justify-center"}>
                            <Loader2 className={"animate-spin"} size={24}/>
                        </div>
                    )}
                    {status === "ok" && (
                        <>
                            {activity.type === "single_choice" && (
                                <h4 className={"font-semibold text-xs"}>Select one option<span className={"text-faded-red ml-0.5"}>*</span></h4>
                            )}
                            {activity.type === "multiple_choice" && (
                                <h4 className={"font-semibold text-xs"}>Select one or more options<span className={"text-faded-red ml-0.5"}>*</span></h4>
                            )}
                            {activity.options && Object.entries(activity.options).map((option) => {
                                return (
                                    <SubjectPressable
                                        key={`option-${option[0]}`}
                                        text={option[1] as string}
                                        color={activity.type === "multiple_choice" ?
                                            (answer.current ?? "").split("$l;").includes(option[1]) ?
                                                undefined : "white"
                                            : undefined
                                        }
                                        hideIcon={activity.type === "multiple_choice"}
                                        onPress={() => {
                                            if (activity.type === "single_choice" || activity.type === "true_false") {
                                                answer.current = option[0];
                                                setStatefulAnswer(answer.current);
                                                nextQuestion();
                                            } else if (activity.type === "multiple_choice") {
                                                const currentAnswer = answer.current;
                                                if (currentAnswer == null) {
                                                    answer.current = option[1];
                                                    setStatefulAnswer(answer.current);
                                                    return;
                                                }

                                                const delimitedAnswers = currentAnswer.split("$l;");
                                                if (delimitedAnswers.includes(option[1])) {
                                                    answer.current = delimitedAnswers.filter(ans => ans !== option[1]).join("$l;");
                                                    setStatefulAnswer(answer.current);
                                                    return;
                                                }

                                                answer.current = [...delimitedAnswers, option[1]].join("$l;");
                                                setStatefulAnswer(answer.current);
                                            }
                                        }}
                                    />
                                )
                            })}
                            {activity.type === "true_false" && (
                                <>
                                    <SubjectPressable
                                        key={`option-true`}
                                        text={"True"}
                                        onPress={() => {
                                            answer.current = "true";
                                            nextQuestion();
                                        }}
                                    />
                                    <SubjectPressable
                                        key={`option-false`}
                                        text={"False"}
                                        onPress={() => {
                                            answer.current = "false";
                                            nextQuestion();
                                        }}
                                    />
                                </>
                            )}
                            {activity.type === "long_answer" && (
                                <div>
                                    <Themed.TextArea
                                        bgColor={"bg-white"}
                                        label={"Write your long answer here"}
                                        required={true}
                                        placeholder={"Type your answer..."}
                                        inputClassName={"h-[6rem]"}
                                        maxLength={1024}
                                        value={statefulAnswer ?? ""}
                                        onChange={(value) => {
                                            answer.current = value;
                                            setStatefulAnswer(value);
                                        }}
                                    />
                                </div>
                            )}
                            {activity.type === "short_answer" && (
                                <div>
                                    <Themed.TextInput
                                        bgColor={"bg-white"}
                                        label={"Write your short answer here"}
                                        required={true}
                                        placeholder={"Type your answer..."}
                                        value={statefulAnswer ?? ""}
                                        onChange={(value) => {
                                            answer.current = value;
                                            setStatefulAnswer(value);
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
                {status === "ok" && activity.type !== "true_false" && activity.type !== "single_choice" && (
                    <div className={"absolute bottom-0 left-0 w-full p-4"}>
                        <button
                            className={"bg-primary p-2 rounded-xl font-semibold text-[#202020] items-center justify-center w-full disabled:opacity-50"}
                            onClick={nextQuestion}
                            disabled={answer.current == null}
                        >
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </SimpleEntityLayout.Layout.Plain>
    )
}
