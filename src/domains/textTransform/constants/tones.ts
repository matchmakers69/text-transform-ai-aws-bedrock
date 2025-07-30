export const AVAILABLE_TONES = [
	{ value: "professional", label: "Professional" },
	{ value: "casual", label: "Casual" },
	{ value: "friendly", label: "Friendly" },
	{ value: "sarcastic", label: "Sarcastic" },
	{ value: "academic", label: "Academic" },
	{ value: "formal", label: "Formal" },
	{ value: "humorous", label: "Humorous" },
	{ value: "persuasive", label: "Persuasive" },
	{ value: "empathetic", label: "Empathetic" },
	{ value: "confident", label: "Confident" },
] as const;

export type Tone = (typeof AVAILABLE_TONES)[number]["value"];
