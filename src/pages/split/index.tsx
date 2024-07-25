import { useGetSplitDetailQuery, useGetSplitListQuery } from "@/api/Splits";
import { AddGroupButton } from "@/components/atoms/add-group-button";
import { DeleteGroupButton } from "@/components/atoms/delete-group-button";
import { EditGroupButton } from "@/components/atoms/edit-group-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const SplitPage = () => {
    const { id } = useParams({
        from: "/_layout/admin/front/$id",
    });

    const { data, isSuccess } = useGetSplitDetailQuery(parseInt(id));
    const { data: splits } = useGetSplitListQuery();
    if (isSuccess) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to="/admin/front">
                            <Button size={"icon"} variant={"outline"}>
                                <ChevronLeft />
                            </Button>
                        </Link>

                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {
                                splits?.filter(
                                    (split) => split.id == parseInt(id)
                                )[0].name
                            }{" "}
                            #
                            {
                                splits?.filter(
                                    (split) => split.id == parseInt(id)
                                )[0].id
                            }
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <AddGroupButton split_id={parseInt(id)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {data.map((group) => {
                        const {
                            qr_url,
                            name,
                            redirect,
                            admin_total,
                            admin_uniq,
                            id,
                            size,
                            user_total,
                            user_uniq,
                            redirect_url,
                        } = group;
                        return (
                            <Card key={id}>
                                <CardHeader className="flex-row items-baseline gap-2">
                                    <CardTitle className="text-xl">
                                        #{id} {name}
                                    </CardTitle>
                                    <Badge>Всего: {size}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col">
                                            <img src={getImageUrl(qr_url)} />
                                            <a
                                                href={redirect_url}
                                                target="_blank"
                                                className="w-full"
                                            >
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full mt-4"
                                                >
                                                    {redirect_url}
                                                </Button>
                                            </a>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 w-full">
                                            <div className="flex justify-between">
                                                <p>admin_total</p>
                                                <Badge variant={"secondary"}>
                                                    {admin_total}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>admin_uniq</p>
                                                <Badge variant={"secondary"}>
                                                    {admin_uniq}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>user_total</p>
                                                <Badge variant={"secondary"}>
                                                    {user_total}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>user_uniq</p>
                                                <Badge variant={"secondary"}>
                                                    {user_uniq}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href={redirect}
                                        target="_blank"
                                        className="w-full"
                                    >
                                        <Button
                                            variant={"outline"}
                                            className="w-full mt-4"
                                        >
                                            {redirect}
                                        </Button>
                                    </a>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex gap-2">
                                        <DeleteGroupButton groupId={id} />
                                        <EditGroupButton group={group} />
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }
    return <></>;
};
