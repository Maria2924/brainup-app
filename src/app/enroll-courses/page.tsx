"use client";
import {Search, User} from "lucide-react";
import UniversalErrorCard from "@/components/UniversalErrorCard";
import {Course} from "@/components/course/course";
import {navigation} from "@/utils/navigation";
import useUser from "@/hooks/useUser";
import {useQuery} from "@tanstack/react-query";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import type {Course as CourseType, EnrolledCourse} from "@/types/course";
import EntityLayout from "@/components/layouts/EntityLayout";

export default function EnrollCoursesPage() {
    const { user } = useUser();
    const courses = useQuery({
        queryKey: ['available-courses'],
        enabled: user !== null,
        queryFn: async () =>
            ((await fetchAuthenticated(user!, "/api/overview/available-courses", {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => res as { data: EnrolledCourse[] })).data.filter(data => !data.currently_enrolled))
    });

    return (
        <EntityLayout title={"Enroll in a course"}>
            <div className={"safe-area-x"}>
                {courses.isSuccess && courses.data.length <= 0 && (
                    <div className={"mt-4"}>
                        <Course.Pressable
                            text={"No more available courses"}
                            onPress={() => navigation.redirect(`/home`)}
                        />
                    </div>
                )}
                <div
                    className={`${courses.isSuccess && courses.data.length > 0 ? "grid grid-cols-2" : "flex flex-col"} items-center gap-4 mt-4`}>
                    {courses.isError && (
                        <UniversalErrorCard error={courses.error?.message ?? "Unknown error"}/>
                    )}
                    {courses.isLoading && (
                        <Course.Pressable text={"Loading..."} color={"#f0f0f0"} onPress={() => {
                        }} className={"animate-pulse"}/>
                    )}
                    {courses.isSuccess && courses.data.map((course) => (
                        <Course.Pressable
                            key={course.id}
                            text={course.name}
                            onPress={() => navigation.redirect(`/enroll?id=${course.id}`)}
                        />
                    ))}
                </div>
            </div>
        </EntityLayout>
    )
}
