import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SnackbarComponent} from "./lib/snackbar.component";
import {SnackbarService} from "./lib/snackbar.service";

export * from "./lib/snackbar.service";
export * from "./lib/snackbar.config";


@NgModule({
	imports: [
		CommonModule
	],
	providers: [
		SnackbarService
	],
	declarations: [
		SnackbarComponent
	],
	exports: [
		SnackbarComponent
	]
})
export class SnackbarModule {
}