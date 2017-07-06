export class SnackbarConfig {
	title: string = "Snackbar title";

	autoClose: boolean = true;
	closeTimeout: number = 5000;
	closeButton: boolean = true;
	deleteOnClose: boolean = false;

	constructor() {
	}

	setTitle(title: string): SnackbarConfig {
		this.title = title;
		return this;
	}
	setAutoClose(autoClose: boolean): SnackbarConfig {
		this.autoClose = autoClose;
		return this;
	}
	setCloseTimeout(closeTimeout: number): SnackbarConfig {
		this.closeTimeout = closeTimeout;
		this.autoClose = true;
		return this;
	}
	setCloseButton(closeButton: boolean): SnackbarConfig {
		this.closeButton = closeButton;
		return this;
	}
	setDeleteOnClose(deleteOnClose: boolean): SnackbarConfig {
		this.deleteOnClose = deleteOnClose;
		return this;
	}
}