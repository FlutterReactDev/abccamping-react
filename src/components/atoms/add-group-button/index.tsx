import { useCreateGroupMutation } from "@/api/Groups";
import { AddGroupForm } from "@/components/forms/add-group-form";
import { addGroupSchema } from "@/components/forms/add-group-form/schema";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { nestedForm } from "@/lib/nested-form";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Users } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useMedia } from "react-use";
import { toast } from "sonner";
import { InferType, object } from "yup";
interface AddGroupButtonProps {
    split_id: number;
}

const schema = object({
    group: addGroupSchema,
});

export const AddGroupButton: FC<AddGroupButtonProps> = (props) => {
    const { split_id } = props;
    const [createGroup, { isLoading }] = useCreateGroupMutation();
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSubmit } = form;
    const isMobile = useMedia("(max-width: 768px)");
    const onCreate = async ({ group }: InferType<typeof schema>) => {
        try {
            await createGroup({
                split_id,
                ...group,
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
    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <Button>
                        <Users />
                        Добавить группу
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="h-[90%]">
                    <DrawerHeader>
                        <DrawerTitle>Добавить группу</DrawerTitle>
                    </DrawerHeader>

                    <div className="overflow-auto h-full">
                        <div className="px-4 ">
                            <Form {...form}>
                                <AddGroupForm
                                    form={nestedForm(form, "group")}
                                />
                            </Form>
                        </div>
                    </div>
                    <DrawerFooter>
                        <LoadingButton
                            onClick={handleSubmit(onCreate)}
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
                    <Users />
                    Добавить группу
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить группу</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCreate)}>
                    <Form {...form}>
                        <AddGroupForm form={nestedForm(form, "group")} />
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
