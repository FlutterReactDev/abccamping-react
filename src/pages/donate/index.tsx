import thanksAnimation from "@/assets/lottie-animtion/thank-animation.json";
import { DonateForm } from "@/components/forms/donate-form";
import { donateSchema } from "@/components/forms/donate-form/schema";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { nestedForm } from "@/lib/nested-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Lottie from "lottie-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, object } from "yup";
const schema = object({
    donate: donateSchema,
});
export const DonatePage = () => {
    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: InferType<typeof schema>) => {
        setOpen(true);
        console.log(data);
    };
    return (
        <div className="flex gap-4 flex-col">
            <div className="flex gap-1 flex-col">
                <h1 className="text-3xl font-medium">
                    Поддержите Константина Конькова
                </h1>
                <p>
                    После заполнения формы вы сможете отсканировать QR-код
                    из приложения банка для перевода денег на кампанию
                </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Form {...form}>
                    <DonateForm form={nestedForm(form, "donate")} />
                </Form>
                <Button type="submit" className="mt-4">
                    Подтвердить
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Спасибо!</DialogTitle>
                        </DialogHeader>
                        <Lottie
                            className="w-full h-full"
                            animationData={thanksAnimation}
                        />
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    );
};
