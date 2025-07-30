import { cn } from "@/shared/utils";

type Value = {
	label: string;
	value: string | number;
};
type Option = string | number | Value;

type SelectFieldProps<T extends Option> = {
	label: string;
	error?: { message?: string } | React.ReactNode;
	options: T[];
	value: string | number;
	onChange: (value: string | number) => void;
	id?: string;
	name?: string;
	className?: string;
	displayEmpty?: boolean;
	emptyLabel?: string;
	placeholder?: string;
};

const getOptionLabel = (option: Option): string => {
	if (typeof option === "object") return option.label;
	return String(option);
};

const getOptionValue = (option: Option): string | number => {
	if (typeof option === "object") return option.value;
	return option;
};

const SelectField = <T extends Option>({
	label,
	options,
	value,
	onChange,
	id,
	name,
	className = "",
	error,
	placeholder,
}: SelectFieldProps<T>) => {
	const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={selectId}
				className="mb-2 text-left text-sm font-medium block text-text-dark-grey leading-6 md:text-sm"
			>
				{label}
			</label>
			<select
				id={selectId}
				name={name}
				className={cn(
					"flex h-16 w-full px-4 py-0 text-left text-sm focus:border-berry-blue focus:outline-none focus:ring-1 focus:ring-berry-blue disabled:cursor-not-allowed disabled:opacity-50 md:text-base rounded-md transition-colors",
					error
						? "border-0 bg-white ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
						: "border border-gray-300 bg-white hover:border-gray-400",
					className,
				)}
				value={value}
				onChange={(e) => {
					const val = e.target.value;
					const original = options.find((opt) => String(getOptionValue(opt)) === val);
					onChange(original !== undefined ? getOptionValue(original) : val);
				}}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((opt, index) => (
					<option key={index} value={getOptionValue(opt)}>
						{getOptionLabel(opt)}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
