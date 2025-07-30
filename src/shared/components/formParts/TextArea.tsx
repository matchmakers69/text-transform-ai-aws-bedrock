import { cn } from "@/shared/utils";
import { forwardRef, useId, type ComponentPropsWithRef, type ForwardedRef } from "react";

export type TextareaProps = ComponentPropsWithRef<"textarea"> & {
	label?: string;
	error?: { message?: string } | React.ReactNode;
	characterCount?: number;
	maxLength?: number;
};

export const Textarea = forwardRef(
	(
		{ className, label, error, readOnly, characterCount, maxLength, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>,
	) => {
		const id = useId();

		return (
			<div>
				{label && (
					<label
						htmlFor={id}
						className={`${
							props.disabled ? "opacity-15" : "opacity-100"
						} mb-3 text-left text-sm font-medium block text-text-dark-grey leading-6 md:text-sm`}
					>
						{label}
					</label>
				)}

				<div className={cn("w-full", error ? "relative" : "static")}>
					<textarea
						className={cn(
							"flex min-h-32 w-full px-4 py-3 text-left text-sm placeholder-gray-500 placeholder:text-left placeholder:opacity-40 focus:border-berry-blue focus:outline-none focus:ring-1 focus:ring-berry-blue disabled:cursor-not-allowed disabled:opacity-50 md:text-base rounded-md transition-colors resize-vertical",
							error
								? "border-0 bg-white ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
								: "border border-gray-300 bg-white hover:border-gray-400",
							readOnly ? "cursor-not-allowed opacity-50 bg-gray-50" : "",
							className,
						)}
						ref={ref}
						id={id}
						readOnly={readOnly}
						maxLength={maxLength}
						{...props}
					/>

					{(characterCount !== undefined || maxLength) && (
						<div className="mt-1 text-right text-xs text-gray-500">
							{characterCount !== undefined && (
								<div>
									{characterCount}
									{maxLength && `/${maxLength}`} characters
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	},
);

Textarea.displayName = "Textarea";
export default Textarea;
