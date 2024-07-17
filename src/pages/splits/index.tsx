import { useGetSplitListQuery } from "@/api/Splits";
import { SplitCard } from "@/components/atoms/split-card";

export const SplitsPage = () => {
    const { data, isSuccess } = useGetSplitListQuery();

    return (
        <div className="grid grid-cols-1  gap-3">
            {isSuccess &&
                data.map((split) => {
                    return <SplitCard {...split} key={split.id} />;
                })}
        </div>
    );
};
