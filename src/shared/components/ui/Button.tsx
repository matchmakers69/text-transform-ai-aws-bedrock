import { forwardRef, type ForwardedRef, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer font-medium py-2 px-4 justify-center whitespace-nowrap text-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-20",
	{
		variants: {
			variant: {
				outline: "border border-black bg-transparent hover:bg-black hover:text-white",
				primary:
					"bg-spinach-green text-white border border-black font-semibold hover:bg-black hover:text-white",
				secondary:
					"bg-valencian-orange text-black border border-black font-semibold hover:bg-black hover:text-white",
				destructive:
					"bg-dark-red text-white border border-black font-semibold hover:bg-black hover:text-white",
				indicator:
					"flex bg-beige-darker hover:bg-valencian-orange border border-black text-black items-center text-sm focus:ring focus:outline-none font-medium",
			},
			size: {
				default: "h-[44px] text-sm min-w-[17rem]",
				full: "h-[44px] px-6 py-2 text-md w-full",
				sm: "px-7 text-sm min-w-[10rem] h-[44px]",
				square: "h-[44px] w-[44px]",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

export type ButtonProps = Readonly<{
	asChild?: boolean;
}> &
	VariantProps<typeof buttonVariants> &
	ComponentProps<"button">;

function ButtonComponent(
	{ className, variant, size, type = "button", disabled, children, ...props }: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	const Comp = "button"; // for future: could switch to `asChild` using Slot

	return (
		<Comp
			type={type}
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			disabled={disabled}
			aria-disabled={disabled}
			{...props}
		>
			{children}
		</Comp>
	);
}

const Button = forwardRef(ButtonComponent);
Button.displayName = "Button";

export default Button;
