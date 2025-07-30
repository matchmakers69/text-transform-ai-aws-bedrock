import { z } from "zod";
import { AVAILABLE_TONES, type Tone } from "../constants/tones";

const textTransformSchema = z.object({
	text: z.string().min(1).max(5000),
	tone: z.enum(AVAILABLE_TONES.map((t) => t.value) as [Tone, ...Tone[]]),
});

type TextTransformValues = z.infer<typeof textTransformSchema>;

export { textTransformSchema };
export type { TextTransformValues };
