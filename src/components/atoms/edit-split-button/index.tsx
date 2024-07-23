import { useEditSplitMutation, useGetSplitListQuery } from "@/api/Splits";
import { Split } from "@/api/Splits/types";
import { addSplitSchema } from "@/components/forms/add-split-form/schema";
import { EditSplitForm } from "@/components/forms/edit-split-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { nestedForm } from "@/lib/nested-form";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilePenLine } from "lucide-react";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";
const schema = object({
    split: addSplitSchema,
});
interface EditSplitButtonProps {
    split: Split;
}
export const EditSplitButton: FC<EditSplitButtonProps> = (props) => {
    const {
        split: { id, name },
    } = props;
    const [editSplit, { isLoading }] = useEditSplitMutation();
    const { data } = useGetSplitListQuery();
    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            split: {
                name,
            },
        },
    });
    const {
        formState: { isDirty },
    } = form;
    const { handleSubmit } = form;

    const onCreate = async ({ split }: InferType<typeof schema>) => {
        try {
            await editSplit({
                data: split,
                splitId: id,
            }).unwrap();
            setOpen(false);
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                const errMsg =
                    "error" in err ? (err.error as string) : err.data.error;
                toast.error(errMsg);
            } else if (isErrorWithMessage(err)) {
                toast.error(err.message);
            }
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant={"outline"}>
                    <FilePenLine />
                    Редактировать
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Редактировать{" "}
                        {data?.filter((split) => split.id == id)[0].name}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCreate)}>
                    <Form {...form}>
                        <EditSplitForm form={nestedForm(form, "split")} />
                    </Form>

                    <DialogFooter>
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            disabled={!isDirty}
                        >
                            Изменить
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
