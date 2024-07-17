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
        } catch (error) {
            toast.error("Произошла непердвиденная ошибка");
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
