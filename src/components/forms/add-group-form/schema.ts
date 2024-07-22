import { InferType, number, object, string } from "yup";

export const addGroupSchema = object({
    split_id: number().required("Это поле обязательн одля заполнения"),
    name: string().required("Это поле обязательн одля заполнения"),
    redirect: string().required("Это поле обязательн одля заполнения"),
    size: number().required("Это поле обязательн одля заполнения"),
});

export type AddGroupType = InferType<typeof addGroupSchema>;
