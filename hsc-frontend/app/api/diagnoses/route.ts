import { openai } from "@/lib/openai";
import { convertMdToHtml } from "@/utils/markdown";
import { NextResponse } from "next/server";
import { ChatCompletionResponseMessage } from "openai";
import * as yup from "yup";

const OPENAI_INSTRUCTION = process.env.OPENAI_INSTRUCTION;

const instruction =
	OPENAI_INSTRUCTION ||
	"1. Generate a detailed list of possible diseases and their preventive measures. 2. Avoid mentioning that you are an AI in the response. 3. Remind the user to seek professional care for a proper diagnosis and personalized advice.";

console.log(OPENAI_INSTRUCTION);

const defaultMessages: ChatCompletionResponseMessage[] = [
	{
		role: "system",
		content: instruction,
	},
];

const diagnoseSchema = yup.object({
	description: yup.string().optional(),
});

export type DiagnoseRequest = yup.InferType<typeof diagnoseSchema>;
export type DiagnoseResponse = {
	diagnosis: string;
};

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as DiagnoseRequest;
		const validatedBody = await diagnoseSchema.validate(body);

		const patientDescription = {
			role: "user",
			content: validatedBody.description,
		} as const;

		const openaiMessages = [...defaultMessages, patientDescription];
		const openaiResponse = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: openaiMessages,
		});

		const diagnosis = openaiResponse.data.choices[0].message;
		if (!diagnosis) {
			return new NextResponse(null, { status: 500 });
		}

		return NextResponse.json(null, { status: 200 });
	} catch (error) {
		return new NextResponse(null, { status: 500 });
	}
}
