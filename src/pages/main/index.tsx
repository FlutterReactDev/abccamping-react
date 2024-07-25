import { PageLoader } from "@/components/atoms/page-loader";
import { useNavigate } from "@tanstack/react-router";

export const MainPage = () => {
    const navigate = useNavigate();
    return (
        <PageLoader
            onComplete={() => {
                navigate({
                    to: "/admin/front/splits",
                });
            }}
        />
    );
};
