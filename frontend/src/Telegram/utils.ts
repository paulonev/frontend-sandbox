import WebApp from "@twa-dev/sdk";

export const telegram_showAlert = (message: string, callback?: () => unknown) => {
    if (WebApp.showAlert) WebApp.showAlert(message, callback);
}

export const telegram_showConfirm = (message: string, callback?: () => unknown) => {
    if (WebApp.showConfirm) WebApp.showConfirm(message, callback);
}