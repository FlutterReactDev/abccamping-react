import { Header } from "@/components/organisms/Header";
import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full h-dvh">
            <Header />
            <main className="p-4">{children}</main>
        </div>
    );
};
