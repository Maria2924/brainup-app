"use client";
import {Search, User} from "lucide-react";
import {Course} from "@/components/course/course";
import type {Course as CourseType} from "@/types/course";
import {navigation} from "@/utils/navigation";
import useUser from "@/hooks/useUser";
import {useQuery} from "@tanstack/react-query";
import {fetchAuthenticated} from "@/api/fetchAuthenticated";
import UniversalErrorCard from "@/components/UniversalErrorCard";

export default function Home() {
    const { user } = useUser();
    const courses = useQuery({
        queryKey: ['courses'],
        enabled: user !== null,
        queryFn: async () =>
            fetchAuthenticated(user!, "/api/student/enrolled-courses", {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => res as CourseType[])
    });
    return (
        <div className={"safe-area-view"}>
            <div className={"mt-2 flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center gap-3"}>
                    <div className={"bg-soft-gray rounded-full w-fit p-1"}>
                        <User size={26} className={"text-[#989898]"}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <p className={"text-faint-gray font-medium text-xs leading-snug"}>Hey there,</p>
                        <h2 className={"font-bold text-sm text-faint-black leading-none"}>{user?.name ?? "Loading"}</h2>
                    </div>
                </div>
                <button>
                    <Search size={18}/>
                </button>
            </div>
            <div className={"mt-8"}>
                <div className={"flex flex-row items-center justify-between"}>
                    <h2 className={"font-semibold text-lg"}>Course Overview</h2>
                </div>
                <div className={"mt-4"}>
                    <Course.Pressable
                        text={"Enroll in a course"}
                        onPress={() => navigation.redirect(`/enroll-courses`)}
                    />
                </div>
                <div className={`${courses.isSuccess && courses.data.length > 0 ? "grid grid-cols-2" : "flex flex-col"} items-center gap-4 mt-4`}>
                    {courses.isError && (
                        <UniversalErrorCard error={courses.error?.message ?? "Unknown error"}/>
                    )}
                    {courses.isLoading && (
                        <Course.Pressable text={"Loading..."} color={"#f0f0f0"} onPress={() => {}} className={"animate-pulse"}/>
                    )}
                    {courses.isSuccess && courses.data.map((course) => (
                        <Course.Pressable
                            key={course.id}
                            text={course.name}
                            onPress={() => navigation.redirect(`/course?id=${course.id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
