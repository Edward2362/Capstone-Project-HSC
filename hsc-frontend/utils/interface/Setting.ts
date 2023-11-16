import { Dayjs } from "dayjs";

export interface ISetting {
	name: string;
	dateOfBirth: Date;
	gender: Gender | string;
	bloodType: BloodType | string;
	height: number | string;
	weight: number | string;
	isSmoking: boolean;
	isDrinking: boolean;
}
export type Gender = "FEMALE" | "MALE";
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O+";
