import { SplitPage } from "@/pages/split";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/admin/front/$id")({
    component: () => <SplitPage />,
});
