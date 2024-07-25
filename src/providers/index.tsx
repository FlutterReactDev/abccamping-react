import { FC, PropsWithChildren } from "react";
import { ReduxProvider } from "./redux-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SonnerComp } from "@/components/ui/sonner";
import { AnimationPreloaderProvider } from "./animation-preloader-provider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AnimationPreloaderProvider>
            <ReduxProvider>
                <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
                <SonnerComp />
            </ReduxProvider>
        </AnimationPreloaderProvider>
    );
};
