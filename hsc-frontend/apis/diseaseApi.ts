import { API_BASE_URL } from "@/apis/apiConstants";
import { httpRequest } from "@/apis/httpRequest";
import { IDisease } from "@/utils/interface/Disease";

export const diseaseApi = {
	searchDiseases: async (query: string) => {
		const responseData = await httpRequest.get(
			API_BASE_URL +
				`/diseases/search?query=${query}&in=NAME_AND_DESCRIPTION`
		);
		return responseData as IDisease[];
	},
	getDisease: async (diseaseId: string) => {
		const responseData = await httpRequest.get(
			API_BASE_URL + `/diseases/${diseaseId}`
		);
		return responseData as IDisease;
	},
	getDiseases: async () => {
		const responseData = await httpRequest.get(API_BASE_URL + `/diseases`);
		return responseData as IDisease[];
	},
};
