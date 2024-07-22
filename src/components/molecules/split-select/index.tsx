import { useGetSplitListQuery } from "@/api/Splits";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

interface SplitSelectProps {
    value: number | undefined;
    onChange: (value: number) => void;
}
export const SplitSelect: FC<SplitSelectProps> = (props) => {
    const { onChange, value } = props;
    const { data } = useGetSplitListQuery();
    return (
        <Select
            value={value ? `${value}` : undefined}
            onValueChange={(value) => onChange(parseInt(value))}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите Сплит" />
            </SelectTrigger>
            <SelectContent>
                {data?.map(({ id, name }) => {
                    return (
                        <SelectItem key={id} value={`${id}`}>
                            {name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
