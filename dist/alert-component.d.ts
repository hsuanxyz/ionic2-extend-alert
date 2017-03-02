import { ElementRef, Renderer } from '@angular/core';
import { Config } from 'ionic-angular/config/config';
import { GestureController, BlockerDelegate, ViewController, Platform, NavParams } from 'ionic-angular';
/**
 * @private
 */
export declare class AlertCmp {
    _viewCtrl: ViewController;
    _elementRef: ElementRef;
    private _renderer;
    private _plt;
    activeId: string;
    descId: string;
    autoInterval: any;
    d: {
        cssClass?: string;
        message?: string;
        title?: string;
        subTitle?: string;
        buttons?: any[];
        inputs?: any[];
        enableBackdropDismiss?: boolean;
    };
    enabled: boolean;
    hdrId: string;
    id: number;
    inputType: string;
    lastClick: number;
    msgId: string;
    subHdrId: string;
    mode: string;
    gestureBlocker: BlockerDelegate;
    constructor(_viewCtrl: ViewController, _elementRef: ElementRef, config: Config, gestureCtrl: GestureController, params: NavParams, _renderer: Renderer, _plt: Platform);
    ionViewDidLoad(): void;
    ionViewWillEnter(): void;
    ionViewDidLeave(): void;
    ionViewWillLeave(): void;
    ionViewDidEnter(): void;
    keyUp(ev: KeyboardEvent): void;
    btnClick(button: any): void;
    rbClick(checkedInput: any): void;
    cbClick(checkedInput: any): void;
    bdClick(): void;
    autoClose(): void;
    dismiss(role: any): Promise<any>;
    getValues(): any;
    ngOnDestroy(): void;
}
