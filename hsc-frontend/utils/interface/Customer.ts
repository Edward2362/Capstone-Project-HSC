import { IDiagnosisHistory } from "./DiagnosisHistory";
import { BloodType, Gender } from "./Setting";

export interface ICustomer {
	id: string;
	email: string;
	name: string;
	dateOfBirth: string;
	gender: Gender;
	bloodType: BloodType;
	height: number;
	weight: number;
	isSmoking: boolean;
	isDrinking: boolean;
	diagnosisHistory: IDiagnosisHistory[];
	isVerify: boolean;
}
