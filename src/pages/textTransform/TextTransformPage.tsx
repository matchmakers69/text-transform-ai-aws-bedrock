import { TextTransformForm } from "@/domains/textTransform";

const TextTransformPage = () => {
	return (
		<div className="max-w-4xl mx-auto p-4 space-y-8">
			<div className="text-center mb-20">
				<h1 className="text-3xl font-bold mb-2">AI Text Transformer</h1>
				<p className="text-grey text-md">Transform your text into different tones using AI</p>
			</div>

			<TextTransformForm />
		</div>
	);
};

export default TextTransformPage;
