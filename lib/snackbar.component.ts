import {
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	HostBinding,
	OnDestroy,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation
} from "@angular/core";
import {SnackbarService} from "./snackbar.service";
import {SnackbarConfig, SnackbarFade} from "./snackbar.config";
import "rxjs/add/operator/takeWhile";

@Component({
	selector: "snackbar",
	templateUrl: "snackbar.component.html",
	styleUrls: ["style.css"],
	encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent implements OnDestroy {
	@HostBinding('class.showed') visible: boolean = false;  // True when visible
	@HostBinding('class.bottom') isBottom: boolean = true;
	@HostBinding('class.top') isTop: boolean = false;
	alive: boolean = false;
	private waitForShow: boolean = false;

	public cfg: SnackbarConfig = new SnackbarConfig();      // Snackbar configuration
	private timeout = undefined;                            // Snackbar hide timeout
	public text: string = "";                               // Snackbar text value


	@ViewChild("snackbarBody", {read: ViewContainerRef}) snackbarBody;
	cmp: ComponentRef<any>;


	constructor(private snackbarService: SnackbarService, private cfr: ComponentFactoryResolver) {
		this.alive = true;

		// Update snackbar configuration
		this.snackbarService.$configSnackbar.takeWhile(() => this.alive).subscribe(config => {
			if (this.cfg.fade != config.fade) {
				this.isBottom = false;
				this.isTop = false;
				if (config.fade == SnackbarFade.BOTTOM) this.isBottom = true;
				else if (config.fade == SnackbarFade.TOP) this.isTop = true;
				this.waitForShow = true;
				setTimeout(() => this.waitForShow = false, 500);
			}

			this.cfg = config;
		});

		// Show the snackbar element
		this.snackbarService.$showSnackbar.takeWhile(() => this.alive).subscribe(() => {
			this.show();
		});

		// Create the component and show the element
		this.snackbarService.$showSnackbarWithComponent.takeWhile(() => this.alive).subscribe(component => {
			let create: () => void = () => {
				this.text = "";
				this.createComponent(component);
				this.show();
			};

			this.visible ? this.hide(create) : create();
		});


		// Set the text and show the element
		this.snackbarService.$showSnackbarWithText.takeWhile(() => this.alive).subscribe(text => {
			let create: () => void = () => {
				this.text = text;
				this.destroyComponent();
				this.show();
			};

			this.visible ? this.hide(create) : create();
		});

		// Hide the snackbar and call the callback
		this.snackbarService.$hideSnackbar.takeWhile(() => this.alive).subscribe(callback => {
			this.hide(callback);
		});
	}

	ngOnDestroy(): void {
		this.alive = false;
		this.destroyComponent();
	}

	// Destroy body component
	private destroyComponent(): void {
		if (this.cmp) this.cmp.destroy();
	}

	// Create body component
	private createComponent(type): void {
		this.destroyComponent();
		let factory = this.cfr.resolveComponentFactory(type);
		this.cmp = this.snackbarBody.createComponent(factory);
		this.show();
	}

	// Show the snackbar
	public show(): void {
		if (this.waitForShow) {
			setTimeout(() => this.show(), 500);
			return;
		}

		this.visible = true;
		if (this.cfg.autoClose) {
			if (this.timeout) clearTimeout(this.timeout);
			this.timeout = setTimeout(() => this.hide(), this.cfg.closeTimeout);
		}
	}

	// Hide the snackbar and call the callback
	public hide(callback?): void {
		this.visible = false;
		if (this.timeout) clearTimeout(this.timeout);

		setTimeout(() => {
			if (this.cfg.deleteOnClose) {
				this.destroyComponent();
				this.text = "";
			}
			if (callback) callback();
		}, 500);
	}

}