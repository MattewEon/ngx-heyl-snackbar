export enum SnackbarFade {
	BOTTOM = <any>"bottom",
	TOP = <any>"top",
}

export class SnackbarConfig {
	title: string = "Snackbar title";

	autoClose: boolean = true;
	closeTimeout: number = 8000;
	closeButton: boolean = true;
	deleteOnClose: boolean = false;
	fade: SnackbarFade = SnackbarFade.BOTTOM;

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
	setFade(fade: SnackbarFade): SnackbarConfig {
		this.fade = fade;
		return this;
	}
}