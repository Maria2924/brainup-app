"use client";
import { redirect } from 'next/navigation';
import {useEffect} from "react";
import useUser from "@/hooks/useUser";

export default function Index() {
    const { user, userFetchStatus } = useUser();
    useEffect(() => {
        console.log(`Root Effect: status=${userFetchStatus}, userExists=${!!user}, path=${window.location.pathname}`);
        if (userFetchStatus === "loading") {
            console.log("Root Effect: Still loading user.");
            return;
        }
        if (user) {
            if (window.location.pathname === "/") {
                console.log("Root Effect: User logged in, on root path. REDIRECTING to /home.");
                redirect("/home");
            } else {
                console.log(`Root Effect: User logged in, but on path ${window.location.pathname} (not /). No redirect needed from root page logic.`);
            }
        } else {
            // Ensure we are not already on an auth page to prevent redirect loops to login
            if (!window.location.pathname.startsWith("/auth/")) {
                console.log("Root Effect: User not logged in. REDIRECTING to /auth/login.");
                redirect("/auth/login");
            } else {
                console.log(`Root Effect: User not logged in, but on auth path ${window.location.pathname}. No redirect needed.`);
            }
        }
    }, [user, userFetchStatus]);
  return (
      <div className={"min-h-screen w-full m-auto items-center justify-center align-middle flex"}>
          <img src={"/icons/logo/brainup-32x32-4x.png"} alt="Brainup" className={"w-28 animate-pulse"}/>
      </div>
  );
}
