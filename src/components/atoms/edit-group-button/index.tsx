import { useEditGroupMutation } from "@/api/Groups";
import { SplitDetail } from "@/api/Splits/types";
import { EditGroupForm } from "@/components/forms/edit-group-form";
import { editGroupSchema } from "@/components/forms/edit-group-form/schema";
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
    group: editGroupSchema,
});
interface EditGroupButtonProps {
    group: SplitDetail;
}
export const EditGroupButton: FC<EditGroupButtonProps> = (props) => {
    const {
        group: { name, id, redirect, size },
    } = props;
    const [editGroup, { isLoading }] = useEditGroupMutation();
    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            group: {
                name,
                redirect,
                size,
            },
        },
    });
    const {
        formState: { isDirty },
    } = form;
    const { handleSubmit } = form;

    const onCreate = async ({ group }: InferType<typeof schema>) => {
        try {
            await editGroup({
                data: group,
                groupId: id,
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
                    <DialogTitle>Редактировать {name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCreate)}>
                    <Form {...form}>
                        <EditGroupForm form={nestedForm(form, "group")} />
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
