"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ionic_angular_1 = require("ionic-angular");
var alert_component_1 = require("./alert-component");
var util_1 = require("ionic-angular/util/util");
var ionic_angular_2 = require("ionic-angular");
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(app, opts) {
        if (opts === void 0) { opts = {}; }
        var _this;
        opts.inputs = opts.inputs || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = util_1.isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        _this = _super.call(this, alert_component_1.AlertCmp, opts, null) || this;
        _this._app = app;
        _this.isOverlay = true;
        return _this;
    }
    Alert.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
        return this._nav && this._nav.config.get(key);
    };
    Alert.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    Alert.prototype.setSubTitle = function (subTitle) {
        this.data.subTitle = subTitle;
    };
    Alert.prototype.setMessage = function (message) {
        this.data.message = message;
    };
    Alert.prototype.addInput = function (input) {
        this.data.inputs.push(input);
    };
    Alert.prototype.addButton = function (button) {
        this.data.buttons.push(button);
    };
    Alert.prototype.setCssClass = function (cssClass) {
        this.data.cssClass = cssClass;
    };
    Alert.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
        return this._app.present(this, navOptions);
    };
    return Alert;
}(ionic_angular_2.ViewController));
exports.Alert = Alert;
var AlertController = (function () {
    function AlertController(_app) {
        this._app = _app;
    }
    AlertController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Alert(this._app, opts);
    };
    return AlertController;
}());
AlertController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof ionic_angular_1.App !== "undefined" && ionic_angular_1.App) === "function" && _a || Object])
], AlertController);
exports.AlertController = AlertController;
var _a;
//# sourceMappingURL=alert.js.map