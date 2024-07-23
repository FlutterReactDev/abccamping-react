import { useCreateSplitMutation } from "@/api/Splits";
import { AddSplitForm } from "@/components/forms/add-split-form";
import { AddSplitType } from "@/components/forms/add-split-form/schema";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/lib/utils";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const AddSplitButton = () => {
    const [createSplit, { isLoading }] = useCreateSplitMutation();
    const [open, setOpen] = useState(false);

    const onCreate = async (data: AddSplitType) => {
        try {
            await createSplit(data).unwrap();
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
                    <PlusCircle />
                    Добавить
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить новый сплит</DialogTitle>
                </DialogHeader>
                <AddSplitForm onCreate={onCreate} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
};
