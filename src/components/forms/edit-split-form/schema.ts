import { InferType, object, string } from "yup";
export const editSplitSchema = object({
    name: string().required("Это поле обязательн одля заполнения"),
});

export type EditSplitType = InferType<typeof editSplitSchema>;
