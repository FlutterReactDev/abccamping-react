import { Split } from "@/api/Splits/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrompt } from "@/hooks/use-prompt";
import { themes } from "@/lib/themes";
import { Link } from "@tanstack/react-router";
import { FilePenLine, GitFork, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { FC } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
const data2 = [
    {
        average: 400,
        today: 240,
    },
    {
        average: 300,
        today: 139,
    },
    {
        average: 200,
        today: 980,
    },
    {
        average: 278,
        today: 390,
    },
    {
        average: 189,
        today: 480,
    },
    {
        average: 239,
        today: 380,
    },
    {
        average: 349,
        today: 430,
    },
];

interface SplitCardProps extends Split {}
export const SplitCard: FC<SplitCardProps> = (props) => {
    const { id, leads_count, name } = props;
    const { theme: mode } = useTheme();
    const prompt = usePrompt();
    const theme = themes.find((theme) => theme.name === "blue");

    const onDelete = async () => {
        const yes = await prompt({
            title: "Вы уверены что хотите удалить",
        });

        console.log(yes);
    };
    return (
        <Link>
            <Card className="cursor-pointer">
                <CardHeader className="flex flex-row  justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle className="text-lg font-medium">
                            {name}
                        </CardTitle>
                        <CardDescription>#{id}</CardDescription>
                    </div>

                    <GitFork className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Badge>{leads_count}</Badge>

                    <div className="h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data2}
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 10,
                                    bottom: 0,
                                }}
                            >
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (
                                            active &&
                                            payload &&
                                            payload.length
                                        ) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Average
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                {
                                                                    payload[0]
                                                                        .value
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Today
                                                            </span>
                                                            <span className="font-bold">
                                                                {
                                                                    payload[1]
                                                                        .value
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null;
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    strokeWidth={2}
                                    dataKey="average"
                                    activeDot={{
                                        r: 6,
                                        style: {
                                            fill: "var(--theme-primary)",
                                            opacity: 0.25,
                                        },
                                    }}
                                    style={
                                        {
                                            stroke: "var(--theme-primary)",
                                            opacity: 0.25,
                                            "--theme-primary": `hsl(${
                                                theme?.cssVars[
                                                    mode === "dark"
                                                        ? "dark"
                                                        : "light"
                                                ].primary
                                            })`,
                                        } as React.CSSProperties
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="today"
                                    strokeWidth={2}
                                    activeDot={{
                                        r: 8,
                                        style: { fill: "var(--theme-primary)" },
                                    }}
                                    style={
                                        {
                                            stroke: "var(--theme-primary)",
                                            "--theme-primary": `hsl(${
                                                theme?.cssVars[
                                                    mode === "dark"
                                                        ? "dark"
                                                        : "light"
                                                ].primary
                                            })`,
                                        } as React.CSSProperties
                                    }
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button variant={"destructive"} onClick={onDelete}>
                        <Trash2 />
                        Удалить
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>
                                <FilePenLine />
                                Редактировать
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full ">
                            <DialogHeader>
                                <DialogTitle>Редактировать</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-1 items-center gap-4">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value="Pedro Duarte" />
                                </div>
                                <div className="grid grid-cols-1 items-center gap-4">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value="@peduarte" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Сохранить</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </Link>
    );
};
