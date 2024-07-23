import { Header } from "@/components/organisms/header";
import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full">
            <Header />
            <main className="py-4 px-4 md:8 lg:px-12">{children}</main>
        </div>
    );
};
