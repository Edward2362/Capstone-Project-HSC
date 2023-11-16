import { NEXT_BASE_URL } from "@/apis/apiConstants";
import { httpRequest } from "@/apis/httpRequest";
import { DiagnoseResponse } from "@/app/api/diagnoses/route";

export const diagnoseApi = {
	diagnose: async (description: string) => {
		return (await httpRequest.post(NEXT_BASE_URL + "/api/diagnoses", {
			description,
		})) as DiagnoseResponse;
	},
};
