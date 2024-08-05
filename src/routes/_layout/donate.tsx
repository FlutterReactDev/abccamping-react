import { DonatePage } from "@/pages/donate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/donate")({
    component: () => <DonatePage />,
});
