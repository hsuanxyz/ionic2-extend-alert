"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var config_1 = require("ionic-angular/config/config");
var dom_1 = require("ionic-angular/util/dom");
var ionic_angular_1 = require("ionic-angular");
var util_1 = require("ionic-angular/util/util");
var key_1 = require("ionic-angular/platform/key");
var AlertCmp = (function () {
    function AlertCmp(_viewCtrl, _elementRef, config, gestureCtrl, params, _renderer, _plt) {
        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._plt = _plt;
        this.gestureBlocker = gestureCtrl.createBlocker(ionic_angular_1.BLOCK_ALL);
        this.d = params.data;
        this.mode = config.get('mode');
        _renderer.setElementClass(_elementRef.nativeElement, "alert-" + this.mode, true);
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(function (cssClass) {
                if (cssClass.trim() !== '')
                    _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = (++alertIds);
        this.descId = '';
        this.hdrId = 'alert-hdr-' + this.id;
        this.subHdrId = 'alert-subhdr-' + this.id;
        this.msgId = 'alert-msg-' + this.id;
        this.activeId = '';
        this.lastClick = 0;
        if (this.d.message) {
            this.descId = this.msgId;
        }
        else if (this.d.subTitle) {
            this.descId = this.subHdrId;
        }
        if (!this.d.message) {
            this.d.message = '';
        }
    }
    AlertCmp.prototype.ionViewDidLoad = function () {
        var _this = this;
        var data = this.d;
        data.buttons = data.buttons.map(function (button) {
            if (typeof button === 'string') {
                return { text: button };
            }
            return button;
        });
        data.inputs = data.inputs.map(function (input, index) {
            return {
                type: input.type || 'text',
                name: util_1.isPresent(input.name) ? input.name : index,
                placeholder: util_1.isPresent(input.placeholder) ? input.placeholder : '',
                value: util_1.isPresent(input.value) ? input.value : '',
                label: input.label,
                checked: !!input.checked,
                disabled: !!input.disabled,
                id: util_1.isPresent(input.id) ? input.id : "alert-input-" + _this.id + "-" + index,
                handler: util_1.isPresent(input.handler) ? input.handler : null,
            };
        });
        var inputTypes = [];
        data.inputs.forEach(function (input) {
            if (inputTypes.indexOf(input.type) < 0) {
                inputTypes.push(input.type);
            }
        });
        if (inputTypes.length > 1 && (inputTypes.indexOf('checkbox') > -1 || inputTypes.indexOf('radio') > -1)) {
            console.warn("Alert cannot mix input types: " + (inputTypes.join('/')) + ". Please see alert docs for more info.");
        }
        this.inputType = inputTypes.length ? inputTypes[0] : null;
        var checkedInput = this.d.inputs.find(function (input) { return input.checked; });
        if (checkedInput) {
            this.activeId = checkedInput.id;
        }
        var hasTextInput = (this.d.inputs.length && this.d.inputs.some(function (i) { return !(dom_1.NON_TEXT_INPUT_REGEX.test(i.type)); }));
        if (hasTextInput && this._plt.is('mobile')) {
            this._renderer.setElementClass(this._elementRef.nativeElement, 'alert-top', true);
        }
        this.autoClose();
    };
    AlertCmp.prototype.ionViewWillEnter = function () {
        this.gestureBlocker.block();
    };
    AlertCmp.prototype.ionViewDidLeave = function () {
        this._plt.focusOutActiveElement();
        this.gestureBlocker.unblock();
    };
    AlertCmp.prototype.ionViewWillLeave = function () {
        this._plt.focusOutActiveElement();
    };
    AlertCmp.prototype.ionViewDidEnter = function () {
        this._plt.focusOutActiveElement();
        var focusableEle = this._elementRef.nativeElement.querySelector('input,button');
        if (focusableEle) {
            focusableEle.focus();
        }
        this.enabled = true;
    };
    AlertCmp.prototype.keyUp = function (ev) {
        if (this.enabled && this._viewCtrl.isLast()) {
            if (ev.keyCode === key_1.Key.ENTER) {
                if (this.lastClick + 1000 < Date.now()) {
                    console.debug("alert, enter button");
                    var button = this.d.buttons[this.d.buttons.length - 1];
                    this.btnClick(button);
                }
            }
            else if (ev.keyCode === key_1.Key.ESCAPE) {
                console.debug("alert, escape button");
                this.bdClick();
            }
        }
    };
    AlertCmp.prototype.btnClick = function (button) {
        clearInterval(this.autoInterval);
        if (!this.enabled) {
            return;
        }
        this.lastClick = Date.now();
        var shouldDismiss = true;
        if (button.handler) {
            if (button.handler(this.getValues()) === false) {
                shouldDismiss = false;
            }
        }
        if (shouldDismiss) {
            this.dismiss(button.role).catch(function () {
                console.debug('alert can not be dismissed');
            });
        }
    };
    AlertCmp.prototype.rbClick = function (checkedInput) {
        if (this.enabled) {
            this.d.inputs.forEach(function (input) {
                input.checked = (checkedInput === input);
            });
            this.activeId = checkedInput.id;
            if (checkedInput.handler) {
                checkedInput.handler(checkedInput);
            }
        }
    };
    AlertCmp.prototype.cbClick = function (checkedInput) {
        if (this.enabled) {
            checkedInput.checked = !checkedInput.checked;
            if (checkedInput.handler) {
                checkedInput.handler(checkedInput);
            }
        }
    };
    AlertCmp.prototype.bdClick = function () {
        if (this.enabled && this.d.enableBackdropDismiss) {
            var cancelBtn = this.d.buttons.find(function (b) { return b.role === 'cancel'; });
            if (cancelBtn) {
                this.btnClick(cancelBtn);
            }
            else {
                this.dismiss('backdrop');
            }
        }
    };
    AlertCmp.prototype.autoClose = function () {
        var _this = this;
        var t;
        var firstBtnIndex = this.d.buttons.findIndex(function (btn) {
            if (btn.time || btn.time <= 0) {
                console.warn("time: not a valid options (Has been ignored)");
            }
            return !!~~btn.time;
        });
        if (firstBtnIndex === -1) {
            return;
        }
        var firstBtnText = this.d.buttons[firstBtnIndex].text || '';
        t = this.d.buttons[firstBtnIndex].time / 1000;
        t = Math.round(t);
        this.d.buttons[firstBtnIndex].text = firstBtnText + " (" + t + ")";
        this.autoInterval = setInterval(function () {
            if (t <= 0) {
                _this.btnClick(_this.d.buttons[firstBtnIndex]);
            }
            else {
                t--;
                _this.d.buttons[firstBtnIndex].text = firstBtnText + " (" + t + ")";
            }
        }, 1000);
    };
    AlertCmp.prototype.dismiss = function (role) {
        var opts = {
            minClickBlockDuration: 400
        };
        return this._viewCtrl.dismiss(this.getValues(), role, opts);
    };
    AlertCmp.prototype.getValues = function () {
        if (this.inputType === 'radio') {
            var checkedInput = this.d.inputs.find(function (i) { return i.checked; });
            return checkedInput ? checkedInput.value : undefined;
        }
        if (this.inputType === 'checkbox') {
            return this.d.inputs.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
        }
        var values = {};
        this.d.inputs.forEach(function (i) {
            values[i.name] = i.value;
        });
        return values;
    };
    AlertCmp.prototype.ngOnDestroy = function () {
        util_1.assert(this.gestureBlocker.blocked === false, 'gesture blocker must be already unblocked');
        this.gestureBlocker.destroy();
    };
    return AlertCmp;
}());
__decorate([
    core_1.HostListener('body:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], AlertCmp.prototype, "keyUp", null);
AlertCmp = __decorate([
    core_1.Component({
        selector: 'ion-alert',
        template: '<ion-backdrop (click)="bdClick()" [class.backdrop-no-tappable]="!d.enableBackdropDismiss"></ion-backdrop>' +
            '<div class="alert-wrapper">' +
            '<div class="alert-head">' +
            '<h2 id="{{hdrId}}" class="alert-title" *ngIf="d.title" [innerHTML]="d.title"></h2>' +
            '<h3 id="{{subHdrId}}" class="alert-sub-title" *ngIf="d.subTitle" [innerHTML]="d.subTitle"></h3>' +
            '</div>' +
            '<div id="{{msgId}}" class="alert-message" [innerHTML]="d.message"></div>' +
            '<div *ngIf="d.inputs.length" [ngSwitch]="inputType">' +
            '<template ngSwitchCase="radio">' +
            '<div class="alert-radio-group" role="radiogroup" [attr.aria-labelledby]="hdrId" [attr.aria-activedescendant]="activeId">' +
            '<button ion-button="alert-radio-button" *ngFor="let i of d.inputs" (click)="rbClick(i)" [attr.aria-checked]="i.checked" [disabled]="i.disabled" [attr.id]="i.id" class="alert-tappable alert-radio" role="radio">' +
            '<div class="alert-radio-icon"><div class="alert-radio-inner"></div></div>' +
            '<div class="alert-radio-label">' +
            '{{i.label}}' +
            '</div>' +
            '</button>' +
            '</div>' +
            '</template>' +
            '<template ngSwitchCase="checkbox">' +
            '<div class="alert-checkbox-group">' +
            '<button ion-button="alert-checkbox-button" *ngFor="let i of d.inputs" (click)="cbClick(i)" [attr.aria-checked]="i.checked" [disabled]="i.disabled" class="alert-tappable alert-checkbox" role="checkbox">' +
            '<div class="alert-checkbox-icon"><div class="alert-checkbox-inner"></div></div>' +
            '<div class="alert-checkbox-label">' +
            '{{i.label}}' +
            '</div>' +
            '</button>' +
            '</div>' +
            '</template>' +
            '<template ngSwitchDefault>' +
            '<div class="alert-input-group">' +
            '<div *ngFor="let i of d.inputs" class="alert-input-wrapper">' +
            '<input [placeholder]="i.placeholder" [(ngModel)]="i.value" [type]="i.type" class="alert-input">' +
            '</div>' +
            '</div>' +
            '</template>' +
            '</div>' +
            '<div class="alert-button-group" [ngClass]="{\'alert-button-group-vertical\':d.buttons.length>2}">' +
            '<button ion-button="alert-button" *ngFor="let b of d.buttons" (click)="btnClick(b)" [ngClass]="b.cssClass">' +
            '{{b.text}}' +
            '</button>' +
            '</div>' +
            '</div>',
        host: {
            'role': 'dialog',
            '[attr.aria-labelledby]': 'hdrId',
            '[attr.aria-describedby]': 'descId'
        },
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof ionic_angular_1.ViewController !== "undefined" && ionic_angular_1.ViewController) === "function" && _a || Object, typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _b || Object, typeof (_c = typeof config_1.Config !== "undefined" && config_1.Config) === "function" && _c || Object, typeof (_d = typeof ionic_angular_1.GestureController !== "undefined" && ionic_angular_1.GestureController) === "function" && _d || Object, typeof (_e = typeof ionic_angular_1.NavParams !== "undefined" && ionic_angular_1.NavParams) === "function" && _e || Object, typeof (_f = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _f || Object, typeof (_g = typeof ionic_angular_1.Platform !== "undefined" && ionic_angular_1.Platform) === "function" && _g || Object])
], AlertCmp);
exports.AlertCmp = AlertCmp;
var alertIds = -1;
var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=alert-component.js.map