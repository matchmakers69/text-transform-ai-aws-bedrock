interface TextTransformRequest {
	text: string;
	tone: string;
}

interface TextTransformResponse {
	title: string;
	transformedText: string;
	error?: string;
}

export type { TextTransformResponse, TextTransformRequest };
