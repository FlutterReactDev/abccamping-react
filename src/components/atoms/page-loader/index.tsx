import Lottie from "lottie-react";
import { FC } from "react";
import animationLoader from "@/assets/lottie-animtion/loader-animation.json";
interface PageLoaderProps {
    onComplete: () => void;
}
export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { onComplete } = props;
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white">
            <Lottie
                animationData={animationLoader}
                onComplete={onComplete}
                className="w-full h-full"
                loop={0}
            />
        </div>
    );
};
