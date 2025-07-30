import { cn } from "@/shared/utils";
import { forwardRef, useId } from "react";

import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type FormInputProps = {
	label?: string;
	error?: { message?: string } | React.ReactNode;
} & InputProps;

const Input = forwardRef<HTMLInputElement, FormInputProps>(
	({ className, type, label, readOnly, error, ...props }, ref) => {
		const id = useId();

		return (
			<div>
				{label && (
					<label
						htmlFor={id}
						className={`${props.disabled ? "opacity-15" : "opacity-100"} mb-3 block text-left font-IbmPlex text-base font-semibold leading-6 md:text-sm`}
					>
						{label}
					</label>
				)}

				<div className={cn("w-full", error ? "relative" : "static")}>
					<input
						type={type}
						className={cn(
							"flex h-16 w-full px-4 py-0 text-left text-sm placeholder-gray-500 placeholder:text-left placeholder:opacity-40 focus:border-berry-blue focus:outline-none focus:ring-1 focus:ring-berry-blue disabled:cursor-not-allowed disabled:opacity-50 md:text-base rounded-md transition-colors",
							error
								? "border-0 bg-white ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
								: "border border-gray-300 bg-white file:border-0 file:bg-transparent file:text-sm file:font-medium hover:border-gray-400",
							readOnly ? "cursor-not-allowed opacity-50 bg-gray-50" : "",
							className,
						)}
						ref={ref}
						id={id}
						readOnly={readOnly}
						{...props}
					/>
				</div>
			</div>
		);
	},
);
Input.displayName = "Input";
export default Input;
