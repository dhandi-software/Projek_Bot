import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all disabled:pointer-events-none shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-hover disabled:bg-zinc-200 disabled:text-zinc-400 focus-visible:ring-brand-primary/50 shadow-xs",
                secondary:
                    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400",
                destructive:
                    "bg-rose-600 text-white hover:bg-rose-700 disabled:bg-rose-200 disabled:text-rose-400",
                ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 disabled:text-zinc-400",
                outline:
                    "border border-brand-primary text-brand-primary hover:bg-brand-primary/10 disabled:border-zinc-200 disabled:text-zinc-400",
                link: "text-brand-primary underline-offset-4 hover:underline disabled:text-zinc-400",
            },
            size: {
                sm: "h-8 text-xs px-3 gap-1.5 [&_svg]:size-3.5",
                md: "h-10 text-xs px-4 gap-2 [&_svg]:size-4",
                lg: "h-12 text-sm px-6 gap-2 [&_svg]:size-4.5",
                icon: "size-9 [&_svg]:size-4",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
