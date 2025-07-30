import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";

const region = import.meta.env.VITE_AWS_DEFAULT_REGION;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
	throw new Error("Missing AWS credentials or region.");
}

const bedrockClient = new BedrockRuntimeClient({
	region,
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
});

export { bedrockClient };
