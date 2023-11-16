export class ApiError extends Error {
	public status: number;
	public data: unknown;

	constructor(status: number, data: unknown) {
		super("ApiError");
		this.status = status;
		this.data = data;
	}
}
