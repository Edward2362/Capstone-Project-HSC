export interface IRegisterInput {
	username: string;
	email: string;
	password: string;
	retypePassword: string;
}

export interface ILoginInput {
	email: string;
	password: string;
}

export interface IDiagnoseInput {
	input: string;
}

export interface ISearchInput {
	input: string;
}
