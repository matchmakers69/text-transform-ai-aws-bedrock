import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/ui";
import useTextTransform from "../hooks/useTextTransform";
import Select from "@/shared/components/formParts/Select";
import { AVAILABLE_TONES } from "../constants/tones";
import Textarea from "@/shared/components/formParts/TextArea";

const TextTransformForm = () => {
	const {
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
	} = useTextTransform();

	const handleReset = () => {
		reset();
		clearResults();
	};
	return (
		<>
			<form onSubmit={onSubmit} className="space-y-6">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="md:col-span-2">
						<Controller
							name="text"
							control={control}
							render={({ field }) => (
								<Textarea
									{...field}
									label="Enter your text to transform"
									placeholder="Enter the text you want to transform..."
									error={errors.text}
									disabled={isPending || isSubmitting}
									characterCount={characterCount ?? 0}
									maxLength={5000}
									rows={6}
								/>
							)}
						/>
					</div>

					{/* Tone Selection */}
					<div>
						<Controller
							name="tone"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									label="Select Tone"
									placeholder="Choose a tone..."
									options={[...AVAILABLE_TONES]}
									error={errors.tone}
								/>
							)}
						/>
					</div>
				</div>

				<div className="flex gap-3 buttons-container mt-15">
					<Button disabled={isPending || isSubmitting || !isDirty} type="submit" variant="primary" size="sm">
						{isPending || isSubmitting ? "Loading..." : "Transform"}
					</Button>

					<Button
						type="button"
						onClick={handleReset}
						disabled={isPending || isSubmitting}
						variant="outline"
						size="sm"
					>
						Reset
					</Button>
				</div>
			</form>
			{success && (
				<div className="p-4 bg-green-100 border border-green-300 rounded-md">
					<p className="text-green-700 font-medium">{success}</p>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<div className="p-4 bg-red-100 border border-red-300 rounded-md">
					<p className="text-red-700 font-medium">{error}</p>
				</div>
			)}
			{result && (
				<div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
					<div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
						<h2 className="text-xl font-bold text-gray-900">{result.title}</h2>
					</div>
					<div className="p-6">
						<div className="prose max-w-none">
							<p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.transformedText}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default TextTransformForm;
