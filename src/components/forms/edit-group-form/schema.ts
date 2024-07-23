import { InferType, number, object, string } from "yup";

export const editGroupSchema = object({
    name: string().required("Это поле обязательн одля заполнения"),
    redirect: string().required("Это поле обязательн одля заполнения"),
    size: number().required("Это поле обязательн одля заполнения"),
});

export type EditGroupType = InferType<typeof editGroupSchema>;
