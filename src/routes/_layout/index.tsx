import { MainPage } from "@/pages/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
    component: () => <MainPage />,
});
