import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

export const Page: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <Card
            className={cn("flex flex-col gap-10", props.className)}
            {...props}
        >
            <CardContent>{props.children}</CardContent>
        </Card>
    );
};

export const PageHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <CardHeader
            className={cn(
                className,
                "flex flex-row justify-between items-center"
            )}
            {...props}
        >
            {children}
        </CardHeader>
    );
};

export const PageContent: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={cn(className)} {...props}>
            {children}
        </div>
    );
};

export const PageTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <CardTitle
            className={cn("text-3xl font-semibold", className)}
            {...props}
        >
            {children}
        </CardTitle>
    );
};

export const PageHeaderButtons: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={cn(className, "flex gap-3")} {...props}>
            {children}
        </div>
    );
};
