import WebApp from "@twa-dev/sdk";

export const telegram_showAlert = (message: string, callback?: () => unknown) => {
    WebApp.showAlert(message, callback);
}