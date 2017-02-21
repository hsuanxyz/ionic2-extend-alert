import { App } from 'ionic-angular';
import { AlertOptions, AlertInputOptions } from 'ionic-angular';
import { NavOptions } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
export declare class Alert extends ViewController {
    private _app;
    constructor(app: App, opts?: AlertOptions);
    getTransitionName(direction: string): any;
    setTitle(title: string): void;
    setSubTitle(subTitle: string): void;
    setMessage(message: string): void;
    addInput(input: AlertInputOptions): void;
    addButton(button: any): void;
    setCssClass(cssClass: string): void;
    present(navOptions?: NavOptions): any;
}
export declare class AlertController {
    private _app;
    constructor(_app: App);
    create(opts?: AlertOptions): Alert;
}
