import {
    Form,
    FormControl,
    FormDescription,
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
import { addSplitSchema, AddSplitType } from "./schema";
interface AddSplitFormProps {
    onCreate: (data: AddSplitType) => void;
    isLoading: boolean;
}
export const AddSplitForm: FC<AddSplitFormProps> = (props) => {
    const { onCreate, isLoading } = props;
    const form = useForm({
        resolver: yupResolver(addSplitSchema),
    });
    const { control, handleSubmit } = form;
    const onSubmit = (data: AddSplitType) => {
        onCreate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3">
                <Form {...form}>
                    <FormField
                        control={control}
                        name={"name"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Название Сплит-теста</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Название Сплит-теста, например Листовка к
                                    экоакции 07.07.24 или Стикер Артём
                                    08.08.2024
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </Form>
                <LoadingButton loading={isLoading}>Добавить</LoadingButton>
            </div>
        </form>
    );
};
