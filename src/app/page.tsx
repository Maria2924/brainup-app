"use client";
import {ReactSVG} from "react-svg";
import {useEffect} from "react";
import useUser from "@/hooks/useUser";

export default function Home() {
    const { user, userFetchStatus } = useUser();
    useEffect(() => {
        if (userFetchStatus === "loading") return;
        if (user) {
            window.location.replace("/home")
        } else {
            window.location.replace("/auth/login")
        }
    }, [user, userFetchStatus]);
  return (
      <div className={"min-h-screen w-full m-auto items-center justify-center align-middle flex"}>
          <img src={"/icons/logo/brainup-32x32-4x.png"} alt="Brainup" className={"w-28 animate-pulse"}/>
      </div>
  );
}
