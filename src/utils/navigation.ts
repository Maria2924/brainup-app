export const navigation = {
    redirect: (url: string) => {
        window.location.assign(url);
    },
    replace: (url: string) => {
        window.location.replace(url);
    },
    reload: () => {
        window.location.reload();
    },
    goBack: () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.assign('/');
        }
    }
}
