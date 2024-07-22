import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
type FetchBaseQueryError = {
    data: {
        error: string;
    };
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getBaseUrl() {
    if (import.meta.env.PROD) {
        return window.location.origin + "/admin";
    }

    if (import.meta.env.DEV) {
        return "https://qr.konkov2024.ru/admin";
    }
}

export function getImageUrl(url: string) {
    if (import.meta.env.PROD) {
        return window.location.origin + url;
    }

    if (import.meta.env.DEV) {
        return `https://qr.konkov2024.ru${url}`;
    }
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (error as any).message === "string"
    );
}
