import { date, InferType, number, object, string } from "yup";

export const donateSchema = object({
    name: string().required("Это поле обязятельно для заполнения"),
    bank: number().required("Это поле обязятельно для заполнения"),
    surname: string().required("Это поле обязятельно для заполнения"),
    middleName: string().required("Это поле обязятельно для заполнения"),
    dateOfBirth: date().required("Это поле обязятельно для заполнения"),
    passportNumber: number().required("Это поле обязятельно для заполнения"),
    address: string().required("Это поле обязятельно для заполнения"),
    sum: number().required("Это поле обязятельно для заполнения"),
});

export type DonateType = InferType<typeof donateSchema>;
