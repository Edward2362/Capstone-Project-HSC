import nlp from "compromise";
import { ICustomer } from "./interface/Customer";

export const age = (birthdate: string | null): string => {
	if (birthdate !== null) {
		const today = new Date();
		const birthdateDate = new Date(birthdate);
		let age = today.getFullYear() - birthdateDate.getFullYear();

		if (
			today.getMonth() < birthdateDate.getMonth() ||
			(today.getMonth() === birthdateDate.getMonth() &&
				today.getDate() < birthdateDate.getDate())
		) {
			age -= 1;
		}
		return age.toString();
	}

	return "--";
};

export const developerPrompt = (): boolean => {
	let pw = prompt("Please confirm that you are HSC developer:");
	if (pw === "adminHSC") {
		return true;
	}
	return false;
};

export function convert_contraction(value: string) {
	var result = "";
	value = value.replace(/[!?@#$%&*()_+;=~`{}<>]/gi, "");
	let doc = nlp(value);
	doc.contractions().expand();
	var data = doc.text().toLocaleLowerCase();

	var words = data.split(" ");
	for (const word of words) {
		if (word.length == 1) {
			result = result + word;
		} else if (word[0] === "," && word[word.length - 1] === ",") {
			result = result + ", " + word.substring(1, word.length - 2) + " ,";
		} else if (word[0] === "." && word[word.length - 1] === ",") {
			result = result + ". " + word.substring(1, word.length - 2) + " ,";
		} else if (word[0] === "," && word[word.length - 1] === ".") {
			result = result + ", " + word.substring(1, word.length - 2) + " .";
		} else if (word[0] === "." && word[word.length - 1] === ".") {
			result = result + ". " + word.substring(1, word.length - 2) + " .";
		} else if (word[0] === ",") {
			result = result + word.replace(/,/gi, ", ");
		} else if (word[0] === ".") {
			result = result + word.replace(/\./gi, ". ");
		} else if (word[word.length - 1] === ",") {
			result = result + word.replace(/,/gi, " ,");
		} else if (word[word.length - 1] === ".") {
			result = result + word.replace(/\./gi, " .");
		} else {
			result = result + word;
		}
		result = result + " ";
	}
	return result;
}

export const toPhysique = (number: number | null): string => {
	if (number === null || number === undefined) {
		return "--";
	}
	return number.toString();
};

export const toYesNo = (status: boolean): string => {
	return status ? "Yes" : "No";
};

export const toBloodType = (bloodType: string | null): string => {
	if (bloodType === null || bloodType === undefined) {
		return "--";
	}
	if (bloodType.substring(bloodType.length - 1) === "P") {
		return bloodType.substring(0, bloodType.length - 1) + "+";
	}
	return bloodType.substring(0, bloodType.length - 1) + "-";
};

export const isSufficientInfo = (
	userData: ICustomer | undefined
): { message: string; status: boolean } => {
	var haveBio =
		userData?.gender !== null &&
		userData?.bloodType !== null &&
		userData?.dateOfBirth !== null &&
		userData?.isSmoking !== null &&
		userData?.isDrinking !== null &&
		userData?.height !== null &&
		userData?.weight !== null;

	var isVerify = userData?.isVerify;
	if (haveBio && isVerify) {
		return { message: "Hello. How can I assist you today?", status: true };
	} else if (!haveBio && isVerify) {
		return {
			message:
				"I cannot find your personal information. Please go to settings page and check it.",
			status: false,
		};
	} else if (haveBio && !isVerify) {
		return {
			message:
				"Your email is not verified. Please go to settings page and check it.",
			status: false,
		};
	} else {
		return {
			message:
				"I cannot find your personal information and the email is not verified. Please go to settings page and check it.",
			status: false,
		};
	}
};

export const getWordCount = (paragraph: string): number => {
	return paragraph.split(" ").filter((word: string) => word).length;
};
