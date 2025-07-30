import { bedrockClient } from "@/shared";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import type { TextTransformRequest, TextTransformResponse } from "../types/TextTransform";

export const transformText = async (request: TextTransformRequest): Promise<TextTransformResponse> => {
	try {
		const { text, tone } = request;

		// Construct the prompt
		const prompt = `You are an expert writer and editor. Your task is to:
  
  1. Rewrite the following text in a ${tone} tone
  2. Generate an appropriate title for the rewritten text
  3. Return your response in the following JSON format:
  {
    "title": "Your generated title here",
    "transformedText": "Your rewritten text here"
  }
  
  Original text to transform:
  """
  ${text}
  """
  
  Requirements:
  - Keep the core meaning and information intact
  - Adapt the language, style, and vocabulary to match the ${tone} tone
  - Make sure the title reflects the content and tone
  - Return ONLY valid JSON, no additional text or explanation`;

		// Send request to Bedrock
		const response = await bedrockClient.send(
			new InvokeModelCommand({
				modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
				contentType: "application/json",
				body: JSON.stringify({
					anthropic_version: "bedrock-2023-05-31",
					max_tokens: 2000,
					temperature: 0.3,
					messages: [
						{
							role: "user",
							content: [
								{
									type: "text",
									text: prompt,
								},
							],
						},
					],
				}),
			}),
		);

		// Parse response
		const decodeResponseBody = new TextDecoder().decode(response.body);
		const responseBody = JSON.parse(decodeResponseBody);
		const aiResponse = responseBody.content[0].text;

		// Try to parse JSON response
		try {
			// Clean the response - remove markdown formatting if present
			let cleanResponse = aiResponse.trim();
			cleanResponse = cleanResponse.replace(/```json\s*/g, "");
			cleanResponse = cleanResponse.replace(/```\s*/g, "");

			// Try to find JSON object in the response
			const jsonMatch = cleanResponse.match(/\{[^{}]*"title"[^{}]*"transformedText"[^{}]*\}/s);
			if (jsonMatch) {
				cleanResponse = jsonMatch[0];
			}

			const parsedResponse = JSON.parse(cleanResponse);

			return {
				title: parsedResponse.title || "Transformed Text",
				transformedText: parsedResponse.transformedText || aiResponse,
			};
		} catch (parseError) {
			console.log("JSON parsing failed:", parseError, "trying pattern matching");

			const titleMatch =
				aiResponse.match(/"title"\s*:\s*"([^"]+)"/i) || aiResponse.match(/title:\s*"([^"]+)"/i);

			const textMatch =
				aiResponse.match(/"transformedText"\s*:\s*"([^"]+)"/i) ||
				aiResponse.match(/transformedText:\s*"([^"]+)"/i);

			if (titleMatch && textMatch) {
				return {
					title: titleMatch[1],
					transformedText: textMatch[1],
				};
			}

			// Ultimate fallback - return raw response
			return {
				title: "Transformed Text",
				transformedText: aiResponse,
			};
		}
	} catch (error) {
		console.error("Text transformation error:", error);

		let errorMessage = "Failed to transform text";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return {
			title: "Error",
			transformedText: "",
			error: errorMessage,
		};
	}
};
