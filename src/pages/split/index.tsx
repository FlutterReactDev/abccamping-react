import { useGetSplitDetailQuery } from "@/api/Splits";
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
        from: "/_layout/admin/$id",
    });

    const { data, isSuccess } = useGetSplitDetailQuery(parseInt(id));
    if (isSuccess) {
        return (
            <div className="flex flex-col gap-4">
                <Link to="/admin">
                    <Button size={"icon"} variant={"outline"}>
                        <ChevronLeft />
                    </Button>
                </Link>

                <div className="grid grid-cols-1 gap-4">
                    {data.map(
                        ({
                            qr_url,
                            name,
                            redirect,
                            admin_total,
                            admin_uniq,
                            id,
                            size,
                            split_id,
                            user_total,
                            user_uniq,
                        }) => {
                            return (
                                <Card key={id}>
                                    <CardHeader className="flex-row items-baseline gap-2">
                                        <CardTitle className="text-xl">
                                            #{split_id} {name}
                                        </CardTitle>
                                        <Badge>Всего: {size}</Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2">
                                            <div>
                                                <img
                                                    src={getImageUrl(qr_url)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 gap-2 w-full">
                                                <div className="flex justify-between">
                                                    <p>admin_total</p>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {admin_total}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p>admin_uniq</p>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {admin_uniq}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p>user_total</p>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {user_total}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p>user_uniq</p>
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {user_uniq}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <a
                                            href={redirect}
                                            target="_blank"
                                            className="w-full"
                                        >
                                            <Button
                                                variant={"outline"}
                                                className="w-full"
                                            >
                                                {redirect}
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }
    return <></>;
};
