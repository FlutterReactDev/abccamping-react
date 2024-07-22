import { SplitSelect } from "@/components/molecules/split-select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { addGroupSchema, AddGroupType } from "./schema";
interface AddGroupFormProps {
    onCreate: (data: AddGroupType) => void;
    isLoading: boolean;
}
export const AddGroupForm: FC<AddGroupFormProps> = ({
    isLoading,
    onCreate,
}) => {
    const form = useForm({
        resolver: yupResolver(addGroupSchema),
    });

    const { control, handleSubmit } = form;

    const onSubmit = async (data: AddGroupType) => {
        onCreate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3">
                <Form {...form}>
                    <FormField
                        control={control}
                        name={"split_id"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Выберите Сплит</FormLabel>
                                <FormControl>
                                    <SplitSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={"name"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Название группы</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Название группы"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={"redirect"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Ссылка</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Ссылка" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={"size"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Количество</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Количество"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
                <LoadingButton loading={isLoading}>Добавить</LoadingButton>
            </div>
        </form>
    );
};
