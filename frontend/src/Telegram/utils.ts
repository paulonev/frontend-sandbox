import { Popup, retrieveLaunchParams, compareVersions } from "@telegram-apps/sdk-react";
// import WebApp from "@twa-dev/sdk";

// export function telegram_ready() {
//     if (WebApp.ready) WebApp.ready();
// }

// export const telegram_isClientEnabled = () => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const w: any = window;
//     const tgWebAppVersion = Object.entries(w.Telegram?.WebView?.initParams).find(([k, ]) => k === "tgWebAppVersion")?.[1] as string | null | undefined;
    
//     return tgWebAppVersion !== null && tgWebAppVersion !== undefined; 
// }

export const telegram_isClientEnabled = () => {
    try {
        // If we are able to extract launch parameters, it means that we are already in the
        // Telegram environment.
        retrieveLaunchParams();
        
        return true;
    } catch {
        return false;
    }
}

// export const telegram_showAlert = (message: string, callback?: () => unknown) => {
//     if (WebApp.showAlert) WebApp.showAlert(message, callback);
// }

export const telegram_showAlert = (popup: Popup, message: string, callback?: () => unknown): Promise<void> => {
    return popup.open({
        message,
        buttons: [{ id: "ok", type: "ok" }]
    }).then(() => {
        callback && callback();
    });
}

// export const telegram_showConfirm = (message: string, callback?: (confirmed: boolean) => unknown) => {
//     if (WebApp.showConfirm) WebApp.showConfirm(message, callback);
// }

export const telegram_showConfirm = (popup: Popup, message: string, onOkClicked?: () => unknown): Promise<void> => {
    return popup.open({ 
        message, 
        buttons: [
            { id: "cancel", type: "cancel" },
            { id: "ok", type: "destructive", text: "OK" }
    ]}).then((id) => {
        if (id === "ok") {
            onOkClicked && onOkClicked();
        }
    });
}

export function telegram_isVersionAtLeast(version: string) {
    const lp = retrieveLaunchParams();
    const res = compareVersions(lp.platform, version);

    return res > -1;
}

// export function telegram_expand() {
//     if (WebApp.expand) WebApp.expand();
// }

// export function telegram_disableVerticalSwipes() {
//     if (telegram_isVersionAtLeast("7.7") && WebApp.disableVerticalSwipes) WebApp.disableVerticalSwipes();
// }