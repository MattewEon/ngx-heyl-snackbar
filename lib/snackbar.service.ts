import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {SnackbarConfig} from "./snackbar.config";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SnackbarService {
	private configSnackbar: Subject<SnackbarConfig> = new Subject<SnackbarConfig>();
	public $configSnackbar: Observable<SnackbarConfig> = this.configSnackbar.asObservable();

	private showSnackbar: Subject<void> = new Subject<void>();
	public $showSnackbar: Observable<void> = this.showSnackbar.asObservable();

	private showSnackbarWithComponent: Subject<Function> = new Subject<Function>();
	public $showSnackbarWithComponent: Observable<Function> = this.showSnackbarWithComponent.asObservable();

	private showSnackbarWithText: Subject<string> = new Subject<string>();
	public $showSnackbarWithText: Observable<string> = this.showSnackbarWithText.asObservable();

	private hideSnackbar: Subject<Function> = new Subject<Function>();
	public $hideSnackbar: Observable<Function> = this.hideSnackbar.asObservable();


	public configureSnackbar(configuration: SnackbarConfig): void {
		this.configSnackbar.next(configuration);
	}

	public openSnackbar(configuration?: SnackbarConfig, snackbarContent?: Function | string): void {
		if (configuration) this.configureSnackbar(configuration);
		if (snackbarContent) {
			if (snackbarContent.constructor.name == "Function") this.setSnackbarComponent(<Function> snackbarContent);
			if (snackbarContent.constructor.name == "String") this.setSnackbarText(<string>snackbarContent);
		}
		this.showSnackbar.next();
	}
	
	public setSnackbarComponent(snackbarBodyComponent: Function): void {
		this.showSnackbarWithComponent.next(snackbarBodyComponent);
	}
	public setSnackbarText(textValue: string): void {
		this.showSnackbarWithText.next(textValue);
	}

	public closeSnackbar(callback?: Function): void {
		this.hideSnackbar.next(callback);
	}
}