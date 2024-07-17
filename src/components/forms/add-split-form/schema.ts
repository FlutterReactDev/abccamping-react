import { InferType, object, string } from "yup";
export const addSplitSchema = object({
    name: string().required("Это поле обязательн одля заполнения"),
});

export type AddSplitType = InferType<typeof addSplitSchema>;
