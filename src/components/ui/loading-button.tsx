import { VariantProps } from "class-variance-authority";

import React from "react";

import { Slot } from "@radix-ui/react-slot";
import { LoaderCircle } from "lucide-react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,

            loading = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        if (loading) {
            return (
                <Comp
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                    disabled
                    children={<LoaderCircle className="animate-spin" />}
                />
            );
        }
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
