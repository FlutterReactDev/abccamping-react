import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerComp = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      closeButton
      richColors
      duration={3000}
      visibleToasts={20}
      expand
      position="bottom-left"
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
