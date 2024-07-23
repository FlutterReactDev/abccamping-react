import { useCreateGroupMutation } from "@/api/Groups";
import { AddGroupForm } from "@/components/forms/add-group-form";
import { AddGroupType } from "@/components/forms/add-group-form/schema";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/lib/utils";
import { Users } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
interface AddGroupButtonProps {
    split_id: number;
}
export const AddGroupButton: FC<AddGroupButtonProps> = (props) => {
    const { split_id } = props;
    const [createGroup, { isLoading }] = useCreateGroupMutation();
    const [open, setOpen] = useState(false);

    const onCreate = async (data: AddGroupType) => {
        try {
            await createGroup({
                split_id,
                ...data,
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
                <Button>
                    <Users />
                    Добавить группу
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить группу</DialogTitle>
                </DialogHeader>
                <AddGroupForm onCreate={onCreate} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
};
