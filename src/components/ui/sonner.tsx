import { useMedia } from "react-use";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerComp = ({ ...props }: ToasterProps) => {
    const isMobile = useMedia("(max-width: 768px)");
    return (
        <Sonner
            className="toaster group pointer-events-auto"
            closeButton
            richColors
            duration={3000}
            visibleToasts={20}
            expand
            {...(!isMobile && {
                position: "bottom-left",
            })}
            {...(isMobile && {
                position: "top-right",
            })}
            toastOptions={{
                classNames: {
                    closeButton: "border-2 w-5 h-5",
                    content: "p-1 text-sm",
                },
            }}
            {...props}
        />
    );
};

export { SonnerComp };
