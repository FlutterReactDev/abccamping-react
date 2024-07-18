import { useGetSplitListQuery } from "@/api/Splits";
import { SplitCard } from "@/components/atoms/split-card";
import { AddSplitButton } from "@/components/organisms/add-split-button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const SplitsPage = () => {
    const { data, isSuccess } = useGetSplitListQuery();

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="flex-row items-center justify-between gap-2">
                    <CardTitle className="text-3xl font-semibold">
                        Сплиты
                    </CardTitle>
                    <div className="flex gap-4">
                        <AddSplitButton />
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1  gap-3">
                {isSuccess &&
                    data.map((split) => {
                        return <SplitCard {...split} key={split.id} />;
                    })}
            </div>
        </div>
    );
};
