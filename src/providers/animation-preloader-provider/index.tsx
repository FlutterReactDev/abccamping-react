import { PageLoader } from "@/components/atoms/page-loader";
import { FC, PropsWithChildren, useState } from "react";
interface AnimationPreloaderProviderProps {
    off?: boolean;
}
export const AnimationPreloaderProvider: FC<
    PropsWithChildren<AnimationPreloaderProviderProps>
> = (props) => {
    const { children, off = false } = props;
    const [isCompleted, setIsCompleted] = useState(false);

    if (isCompleted) {
        return <>{children}</>;
    }
    if (off) {
        return <>{children}</>;
    }
    return (
        <PageLoader
            onComplete={() => {
                setIsCompleted(true);
            }}
        />
    );
};
