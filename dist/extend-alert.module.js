import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";
import { AlertController } from './alert';
import { AlertCmp } from './alert-component';
export var ExtendAlertModule = (function () {
    function ExtendAlertModule() {
    }
    ExtendAlertModule.decorators = [
        { type: NgModule, args: [{
                    imports: [IonicModule, CommonModule],
                    declarations: [AlertCmp],
                    exports: [],
                    providers: [AlertController],
                    entryComponents: [AlertCmp],
                },] },
    ];
    /** @nocollapse */
    ExtendAlertModule.ctorParameters = [];
    return ExtendAlertModule;
}());
//# sourceMappingURL=extend-alert.module.js.map