import { useDeteleGroupMutation } from "@/api/Groups";
import { LoadingButton } from "@/components/ui/loading-button";
import { usePrompt } from "@/hooks/use-prompt";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";
interface DeleteGroupButtonProps {
    groupId: number;
}
export const DeleteGroupButton: FC<DeleteGroupButtonProps> = ({ groupId }) => {
    const prompt = usePrompt();
    const [deleteGroup, { isLoading }] = useDeteleGroupMutation();
    const onDelete = async () => {
        const yes = await prompt({
            title: "Вы уверены что хотите удалить? ",
        });

        if (yes) {
            try {
                await deleteGroup(groupId).unwrap();
            } catch (err) {
                if (isFetchBaseQueryError(err)) {
                    const errMsg =
                        "error" in err ? (err.error as string) : err.data.error;
                    toast.error(errMsg);
                } else if (isErrorWithMessage(err)) {
                    toast.error(err.message);
                }
            }
        }
    };

    return (
        <LoadingButton
            variant={"destructive"}
            onClick={onDelete}
            loading={isLoading}
            size={"icon"}
        >
            <Trash2 />
        </LoadingButton>
    );
};
