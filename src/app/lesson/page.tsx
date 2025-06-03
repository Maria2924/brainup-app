"use client";
import EntityLayout from "@/components/layouts/EntityLayout";
import {Course} from "@/components/course/course";
import React, {useState} from "react";
import { navigation } from "@/utils/navigation";
import {useSearchParams} from "next/navigation";
import useUser from "@/hooks/useUser";
import {useQuery} from "@tanstack/react-query";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import type {Activity, Course as CourseType, Lesson} from "@/types/course";
import UniversalErrorCard from "@/components/UniversalErrorCard";
import {Loader2} from "lucide-react";

type SectionProps = {
    title: string;
    onViewAll: () => void;
    excludeBorder?: boolean;
    children: React.ReactNode;
};
function Section({ title, onViewAll, excludeBorder, children }: SectionProps) {
    return (
        <div className={`${excludeBorder ? "" : "border-b"} border-b-black p-4`}>
            <div className={"flex flex-row items-center justify-between"}>
                <h3 className={"font-bold text-sm text-dim-gray"}>{title}</h3>
                <button
                    className={"text-xs font-mediumtext-light-gray text-opacity-25"}
                    onClick={onViewAll}
                >
                    View All
                </button>
            </div>
            <div className={"mt-4 flex flex-col gap-4"}>
                {children}
            </div>
        </div>
    )
}

export default function SubjectPage() {
    const queryParams = useSearchParams();
    const course = queryParams.get("course");
    const id = queryParams.get("id");

    const { user } = useUser();
    const [error, setError] = useState<string | null>(null);

    const lesson = useQuery({
        queryKey: ['lesson', course, id],
        enabled: id !== null && user !== null && course !== null,
        queryFn: () =>
            fetchAuthenticated(user!, `/api/student/enrolled-course/${course}/lesson/${id}/activities`, {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => res as { lesson: Lesson, activities: Activity[] })
    });

    if (!id || !course) {
        return (
            <div className="safe-area-view">
                <UniversalErrorCard error={"Invalid course/lesson ID."}/>
            </div>
        );
    }

    return (
        <EntityLayout
            title={(lesson.isSuccess ? `${lesson.data.lesson.title}` : "Loading...")}
            description={lesson.isSuccess ? lesson.data.lesson.content : "Loading lesson details..."}
            videoUrl={lesson.isSuccess ? lesson.data.lesson.video_url : undefined}
        >
            <div className={"p-4"}>
                {lesson.isError || error && (
                    <div className={"mt-4"}>
                        <UniversalErrorCard error={error ?? lesson.error?.message ?? "Unknown error"}/>
                    </div>
                )}
                {lesson.isLoading && (
                    <div className={"flex items-center justify-center mt-4"}>
                        <Loader2 className={"animate-spin"} size={24}/>
                    </div>
                )}
                {lesson.isSuccess && (
                    <div className={"mt-4 flex flex-col gap-4"}>
                        {lesson.data.activities && lesson.data.activities.length > 0 && (
                            <Course.Subject
                                text={
                                    lesson.data.activities.findIndex((v) => !v.user_answered) >= 0 ?
                                        "Answer Activity" :
                                        `Score: ${lesson.data.activities.map(v => v.user_answer.is_correct).reduce((a, b) => a + (b ? 1 : 0), 0)} / ${lesson.data.activities.length}`
                                }
                                hideIcon={lesson.data.activities.findIndex((v) => !v.user_answered) < 0}
                                onPress={() => {
                                    if (lesson.data.activities.findIndex((v) => !v.user_answered) < 0) {
                                        return;
                                    }

                                    window.localStorage.setItem(`course[${course}]:activity[${id}]`, JSON.stringify(lesson.data.activities));
                                    setTimeout(() => {
                                        navigation.redirect(`/lesson/activity?id=${id}&course=${course}`);
                                    }, 500);
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </EntityLayout>
    )
}
