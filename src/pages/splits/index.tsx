import { useGetSplitListQuery } from "@/api/Splits";
import { Split } from "@/api/Splits/types";
import { AddSplitButton } from "@/components/atoms/add-split-button";
import { SplitCard } from "@/components/molecules/split-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { FC, useRef } from "react";

export const SplitsPage = () => {
    const { data, isSuccess, isLoading } = useGetSplitListQuery();

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

            {isSuccess && <SplitList list={data} />}
        </div>
    );
};

interface SplitListProps {
    list: Split[];
}
const SplitList: FC<SplitListProps> = ({ list }) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const virtualizer = useWindowVirtualizer({
        count: list.length,
        estimateSize: () => 45,
        gap: 10,
        scrollMargin: listRef.current?.offsetTop ?? 0,
    });

    return (
        <div ref={listRef} className="mb-1">
            <div
                style={{
                    width: "100%",
                    position: "relative",
                    height: `${virtualizer.getTotalSize()}px`,
                }}
            >
                {virtualizer
                    .getVirtualItems()
                    .map(({ index, start, key, measureElement }) => {
                        return (
                            <div
                                key={key}
                                data-index={index}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    zIndex: 40,
                                    width: "100%",
                                    marginBottom: "15px",
                                    transform: `translateY(${
                                        start - virtualizer.options.scrollMargin
                                    }px)`,
                                }}
                                ref={measureElement}
                            >
                                <SplitCard {...list[index]} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
