import WebApp from "@twa-dev/sdk";

export const telegram_isClientEnabled = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w: any = window;
    const tgWebAppVersion = Object.entries(w.Telegram?.WebView?.initParams).find(([k, ]) => k === "tgWebAppVersion")?.[1] as string | null | undefined;
    
    return tgWebAppVersion !== null && tgWebAppVersion !== undefined; 
}

export const telegram_showAlert = (message: string, callback?: () => unknown) => {
    if (WebApp.showAlert) WebApp.showAlert(message, callback);
}

export const telegram_showConfirm = (message: string, callback?: (confirmed: boolean) => unknown) => {
    if (WebApp.showConfirm) WebApp.showConfirm(message, callback);
}

export function telegram_isVersionAtLeast(version: string) {
    if (WebApp.isVersionAtLeast) return WebApp.isVersionAtLeast(version);
}