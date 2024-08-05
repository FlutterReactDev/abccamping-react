import { useGetDonateQrQuery } from "@/api/Donate";
import AlphaBank from "@/assets/icons/alpha-bank.svg";
import TBankIcon from "@/assets/icons/tbank.svg";
import SberIcon from "@/assets/SBER.ME.png";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NestedForm } from "@/lib/nested-form";
import { Ellipsis, Loader2 } from "lucide-react";
import { FC } from "react";
import { DonateType } from "./schema";

interface DonateFormProps {
    form: NestedForm<DonateType>;
}
export const DonateForm: FC<DonateFormProps> = ({ form }) => {
    const { data, isLoading, isSuccess } = useGetDonateQrQuery();
    const { path, control } = form;

    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="grid grid-cols-1 gap-3 ">
                <Form {...form}>
                    <FormField
                        control={control}
                        name={path("bank")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xl">
                                    Выберите банк
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={`${field.value}`}
                                        className="grid grid-cols-3 gap-4"
                                        onValueChange={(value) => {
                                            field.onChange(parseInt(value));
                                        }}
                                    >
                                        <div className="h-full">
                                            <RadioGroupItem
                                                value="1"
                                                id="1"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="1"
                                                className="flex h-40 flex-col gap-4 items-center cursor-pointer justify-between rounded-md border-2 border-muted bg-popover transition-colors p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <img
                                                    src={SberIcon}
                                                    className="w-14 h-14"
                                                />
                                                <p className="text-xl">Сбер</p>
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="paypal"
                                                id="paypal"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="paypal"
                                                className="flex h-40 cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <div className="flex gap-2 items-center">
                                                    <img
                                                        src={TBankIcon}
                                                        className="w-20 h-20"
                                                    />
                                                    <img
                                                        src={AlphaBank}
                                                        className="w-14 h-14"
                                                    />
                                                </div>

                                                <p className="text-xl">
                                                    ТБанк/Альфа банк
                                                </p>
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="apple"
                                                id="apple"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="apple"
                                                className=" h-40 flex flex-col items-center justify-center  rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <Ellipsis />
                                                <p className="text-xl">
                                                    {" "}
                                                    Другие
                                                </p>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("surname")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Фамилия</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="Иванов"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("name")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="Иван"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("middleName")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Отчество</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="Иванович"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("dateOfBirth")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Дата рождения</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="13.12.1984"
                                        type="date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("passportNumber")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Номер паспорта РФ</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="7382 274827"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("address")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Адрес прописки по паспорту
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="г. Москва, ул. Багрицкого, д. 5, кв. 15."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={path("sum")}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Сумма</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-white"
                                        placeholder="от 450 рублей"
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

            <div className="w-full h-full  flex items-center justify-center flex-col gap-4">
                <div className="rounded-lg bg-background w-72 h-72 flex items-center justify-center">
                    {isSuccess && <img src={data} />}
                    {isLoading && <Loader2 className="animate-spin w-10 h-10 text-primary" />}
                </div>
                <div className="text-muted-foreground">
                    Отсканируйте код в банковском приложении
                </div>
            </div>
        </div>
    );
};
