"use client";
import {useSearchParams} from "next/navigation";
import UniversalErrorCard from "@/components/UniversalErrorCard";
import {useQuery} from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import {EnrolledCourse} from "@/types/course";
import EntityLayout from "@/components/layouts/EntityLayout";
import {Loader2} from "lucide-react";
import {Course} from "@/components/course/course";
import React, {useState} from "react";
import {navigation} from "@/utils/navigation";

export default function EnrollPage() {
    const queryParams = useSearchParams();
    const id = queryParams.get("id");

    const { user } = useUser();
    const [error, setError] = useState<string | null>(null);

    const course = useQuery({
        queryKey: ['course', id],
        enabled: id !== null && user !== null,
        queryFn: () =>
            fetchAuthenticated(user!, `/api/overview/course/${id}/show`, {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => res as { course_details: EnrolledCourse })
    });

    const enroll = useQuery({
        queryKey: ['enroll', id],
        enabled: false,
        queryFn: () =>
            fetchAuthenticated(user!, `/api/student/course/${id}/enroll`, {
                method: "POST"
            })
                .then(res => res.json())
                .then(res => res as { message: string })
    })

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
            <div className={"safe-area-x"}>
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
                    <div className={"mt-4 flex flex-col gap-4"}>
                        <Course.Subject
                            text={enroll.isLoading ? "Enrolling..." : "Enroll in this course"}
                            className={enroll.isLoading ? "animate-pulse" : ""}
                            onPress={() => {
                                if (enroll.isLoading) return;
                                enroll.refetch().then(() => {
                                    if (enroll.isSuccess) {
                                        navigation.redirect("/home")
                                    } else {
                                        setError("Failed to enroll in the course. Please try again later.");
                                    }
                                });
                            }}
                        />
                    </div>
                )}
            </div>
        </EntityLayout>
    )
}
