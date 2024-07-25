import { useCreateSplitMutation } from "@/api/Splits";
import { AddSplitForm } from "@/components/forms/add-split-form";
import { addSplitSchema } from "@/components/forms/add-split-form/schema";
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

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object } from "yup";
import { useMedia } from "react-use";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
const schema = object({
    split: addSplitSchema,
});
export const AddSplitButton = () => {
    const isMobile = useMedia("(max-width: 768px)");
    const [createSplit, { isLoading }] = useCreateSplitMutation();
    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSubmit } = form;

    const onCreate = async ({ split }: InferType<typeof schema>) => {
        try {
            await createSplit(split).unwrap();
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

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <Button>
                        <PlusCircle />
                        Добавить сплит
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="h-[90%]">
                    <DrawerHeader>
                        <DrawerTitle>Добавить новый сплит</DrawerTitle>
                    </DrawerHeader>

                    <div className="overflow-auto">
                        <div className="px-4 ">
                            <Form {...form}>
                                <AddSplitForm
                                    form={nestedForm(form, "split")}
                                />
                            </Form>
                        </div>
                    </div>
                    <DrawerFooter>
                        <LoadingButton
                            onClick={handleSubmit(onCreate)}
                            type="submit"
                            loading={isLoading}
                        >
                            Добавить
                        </LoadingButton>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button>
                    <PlusCircle />
                    Добавить сплит
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить новый сплит</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCreate)}>
                    <Form {...form}>
                        <AddSplitForm form={nestedForm(form, "split")} />
                    </Form>

                    <DialogFooter>
                        <LoadingButton loading={isLoading} type="submit">
                            Добавить
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
