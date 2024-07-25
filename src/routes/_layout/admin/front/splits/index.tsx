import { SplitsPage } from "@/pages/splits";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/admin/front/splits/")({
    component: () => <SplitsPage />,
});
