import { IsBoolean, IsObject, IsString } from "class-validator";

export class PageResObj<T> {
	@IsString()
	msg: string;

	@IsObject()
	item: T;

	@IsBoolean()
	error: boolean;

	private checkEmptyItem() {
		if (!this.item) {
			this.msg = "The data does not exist";
			this.error = true;
		}
	}

	constructor(item: T, msg: string, error: boolean = false) {
		this.error = error;
		this.msg = msg;
		this.item = item;
		this.checkEmptyItem();
	}
}
