import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NestedForm } from "@/lib/nested-form";
import { FC } from "react";
import { EditSplitType } from "./schema";
interface AddSplitFormProps {
    form: NestedForm<EditSplitType>;
}
export const EditSplitForm: FC<AddSplitFormProps> = (props) => {
    const { form } = props;
    const { control, path } = form;
    return (
        <div className="grid grid-cols-1 gap-3">
            <Form {...form}>
                <FormField
                    control={control}
                    name={path("name")}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Название Сплит-теста</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </div>
    );
};
