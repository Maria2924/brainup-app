"use client";
import {useEffect} from "react";
import useUser from "@/hooks/useUser";
import {redirect} from "next/navigation";

export default function Index() {
    const { user, userFetchStatus } = useUser(true);
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
        }
    }, [user, userFetchStatus]);
  return (
      <div className={"min-h-screen w-full m-auto items-center justify-center align-middle flex"}>
          <img src={"/icons/logo/brainup-32x32-4x.png"} alt="Brainup" className={"w-28 animate-pulse"}/>
      </div>
  );
}
