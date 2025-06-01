import {redirect, RedirectType} from "next/navigation";

export const navigation = {
    redirect: (url: string) => {
        redirect(url);
    },
    replace: (url: string) => {
        redirect(url, RedirectType.replace);
    },
    reload: () => {
        window.location.reload();
    },
    goBack: () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            redirect("/home", RedirectType.replace)
        }
    },
    handleNextRedirectError: (e: any) => {
        if (e === "NEXT_REDIRECT" || (e instanceof Error) && e.message === "NEXT_REDIRECT") {
            throw e;
        }
    }
}
