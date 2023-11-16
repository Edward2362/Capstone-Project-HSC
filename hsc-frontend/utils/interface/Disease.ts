export interface IDisease {
	id: string;
	name: string;
	description?: string;
	precautions?: IPrecaution[];
	symptoms: ISymptom[];
}

export interface IPrecaution {
	id: string;
	description: string;
	order?: number;
}

export interface ISymptom {
	id: string;
	name: string;
	weight?: number;
}
