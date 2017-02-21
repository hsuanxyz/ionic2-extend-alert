# ionic2-extend-alert
Ionic2 extended version of alert component

## Extend
1. Set dialog auto-cancel

![](https://github.com/HsuanXyz/hsuan.github.io/blob/master/assets/ionic2-extend-alert/alert-demo1.gif?raw=true)

## Install
` npm install ionic2-extend-alert --save`

## Use
Import module
```
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
...
import { ExtendAlertModule } from 'ionic2-extend-alert/dist/extend-alert.module'


@NgModule({
  declarations: [
    MyApp,
    ...
  ],
  imports: [
    ExtendAlertModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
```
Your component

```
import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
...
import { AlertController } from 'ionic2-extend-alert/dist/alert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    ...
    public alertCtrl: AlertController

  ) {
  }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Hi!',
      message: 'Hello Ionic2',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok',
          time:6000, // set auto-cancel time
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
```

## Environment
```
Cordova CLI: 6.4.0
Ionic Framework Version: 2.0.0
Ionic CLI Version: 2.1.18
Ionic App Lib Version: 2.1.9
Ionic App Scripts Version: 1.0.0
ios-deploy version: Not installed
ios-sim version: Not installed
OS: macOS Sierra
Node Version: v6.9.2
Xcode version: Xcode 8.2.1 Build version 8C1002
```
