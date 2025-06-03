"use client";
import React, {useState} from "react";
import {Course} from "@/components/course/course";
import type {Course as CourseType, Lesson} from "@/types/course";
import EntityLayout from "@/components/layouts/EntityLayout";
import {navigation} from "@/utils/navigation";
import {useSearchParams} from "next/navigation";
import useUser from "@/hooks/useUser";
import {useQuery} from "@tanstack/react-query";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import UniversalErrorCard from "@/components/UniversalErrorCard";
import {Loader2} from "lucide-react";

export default function CoursePage() {
    const queryParams = useSearchParams();
    const id = queryParams.get("id");

    const { user } = useUser();
    const [error, setError] = useState<string | null>(null);

    const course = useQuery({
        queryKey: ['course', id],
        enabled: id !== null && user !== null,
        queryFn: () =>
            fetchAuthenticated(user!, `/api/student/enrolled-course/${id}/show`, {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => res as { course_details: CourseType, relationships: { lessons?: Lesson[] } })
    });

    if (!id) {
        return (
            <div className="safe-area-view">
                <UniversalErrorCard error={"Invalid course ID."}/>
            </div>
        );
    }
    return (
        <EntityLayout
            title={(course.isSuccess ? `${course.data.course_details.name}` : "Loading...")}
            description={course.isSuccess ? course.data.course_details.description : "Loading course details..."}
        >

            <div className={"p-4"}>
                {course.isError || error && (
                    <div className={"mt-4"}>
                        <UniversalErrorCard error={error ?? course.error?.message ?? "Unknown error"}/>
                    </div>
                )}
                {course.isLoading && (
                    <div className={"flex items-center justify-center mt-4"}>
                        <Loader2 className={"animate-spin"} size={24}/>
                    </div>
                )}
                {course.isSuccess && (
                    <>
                        <h3 className={"font-bold text-sm text-dim-gray"}>Lessons</h3>
                        <div className={"mt-4 flex flex-col gap-4"}>
                            {course.data.relationships?.lessons != null && course.data.relationships.lessons.length > 0 && course.data.relationships.lessons.map((lesson) => (
                                <Course.Subject
                                    key={lesson.id}
                                    text={lesson.title}
                                    onPress={() => navigation.redirect(`/lesson?id=${lesson.id}&course=${course.data!.course_details!.id}`)}
                                />
                            ))}
                            {(course.data.relationships.lessons == null || course.data.relationships.lessons.length <= 0) && (
                                <Course.Subject text={"No lessons available"} onPress={() => navigation.redirect(`/home`)}/>
                            )}
                        </div>
                    </>
                )}
            </div>
        </EntityLayout>
    )
}
