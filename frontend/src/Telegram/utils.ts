import { Popup, retrieveLaunchParams, compareVersions } from "@telegram-apps/sdk-react";

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

export const telegram_showAlert = (popup: Popup, message: string, callback?: () => unknown): Promise<void> => {
    return popup.open({
        message,
        buttons: [{ id: "ok", type: "ok" }]
    }).then(() => {
        callback && callback();
    });
}

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
