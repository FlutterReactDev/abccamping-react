import { PageLoader } from "@/components/atoms/page-loader";
import { FC, PropsWithChildren, useState } from "react";
interface AnimationPreloaderProviderProps {
    off?: boolean;
}

function getBoolean(data: string) {
    if (data == "1") {
        return true;
    }

    if (data == "0") {
        return false;
    }
}
export const AnimationPreloaderProvider: FC<
    PropsWithChildren<AnimationPreloaderProviderProps>
> = (props) => {
    const { children, off = false } = props;
    const localStorageData = localStorage.getItem("isCompleted");
    const animationShowed: boolean | undefined = localStorageData
        ? getBoolean(JSON.parse(localStorageData))
        : undefined;

    const [isCompleted, setIsCompleted] = useState(
        animationShowed != undefined ? animationShowed : false
    );
    if (off) {
        return <>{children}</>;
    }
    if (isCompleted) {
        return <>{children}</>;
    }

    return (
        <PageLoader
            onComplete={() => {
                setIsCompleted(true);
                localStorage.setItem("isCompleted", JSON.parse("1"));
            }}
        />
    );
};
