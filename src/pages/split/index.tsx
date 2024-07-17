import { useGetSplitDetailQuery } from "@/api/Splits";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const SplitPage = () => {
    const { id } = useParams({
        from: "/_layout/splits/$id",
    });
    const { data, isSuccess } = useGetSplitDetailQuery(parseInt(id));
    if (isSuccess) {
        return (
            <div className="mx-auto grid max-w-7xl  gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/splits">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Назад</span>
                        </Button>
                    </Link>

                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        #{data.split_id} {data.name}
                    </h1>

                    <Badge className="ml-auto sm:ml-0">{data.size}</Badge>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm">
                            Изменить
                        </Button>
                        <Button size="sm" variant={"destructive"}>
                            Удалить
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Количество переходов</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex justify-between">
                                        <p>admin_total</p>
                                        <Badge variant={"secondary"}>
                                            {data.admin_total}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>admin_uniq</p>
                                        <Badge variant={"secondary"}>
                                            {data.admin_uniq}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>user_total</p>
                                        <Badge variant={"secondary"}>
                                            {data.user_total}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>user_uniq</p>
                                        <Badge variant={"secondary"}>
                                            {data.user_uniq}
                                        </Badge>
                                    </div>
                                    <Button variant={"outline"}>
                                        <a href={data.redirect} target="_blank">
                                            {data.redirect}
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <CardTitle>QR</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur
                                    adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={data.qr_url} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
        );
    }
    return <></>;
};
