import { useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { textTransformSchema, type TextTransformValues } from "../schemas/textTransformSchema";
import { transformText } from "../services/textTransformService";

const useTextTransform = () => {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");
	const [result, setResult] = useState<{
		title: string;
		transformedText: string;
	} | null>(null);

	const {
		control,
		watch,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<TextTransformValues>({
		mode: "all",
		resolver: zodResolver(textTransformSchema),
		defaultValues: { text: "", tone: undefined },
	});

	const watchedText = watch("text", "");
	const characterCount = watchedText.length;

	const handleTextTransformSubmit: SubmitHandler<TextTransformValues> = async (data) => {
		startTransition(async () => {
			setError("");
			setSuccess("");

			try {
				const response = await transformText({
					text: data.text,
					tone: data.tone,
				});

				if (response.error) {
					setError(response.error);
				} else {
					setResult({
						title: response.title,
						transformedText: response.transformedText,
					});
					setSuccess("Text transformed successfully!");
				}
			} catch (error) {
				console.error("Transform error:", error);
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unexpected error occurred.");
				}
			}
		});
	};
	const onSubmit = handleSubmit(handleTextTransformSubmit);

	const clearResults = () => {
		setResult(null);
		setSuccess("");
		setError("");
	};

	return {
		control,
		errors,
		isSubmitting,
		isDirty,
		isPending,
		success,
		error,
		result,
		onSubmit,
		reset,
		clearResults,
		characterCount,
		setError,
		setSuccess,
		setResult,
	};
};

export default useTextTransform;
