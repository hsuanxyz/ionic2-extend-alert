/**
 * Created by hsuanlee on 2017/2/20.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA }           from '@angular/core';

import { CommonModule } from '@angular/common';
import {IonicModule} from "ionic-angular";

import { AlertController } from './alert'
import { AlertCmp } from './alert-component'

@NgModule({
  imports:  [  IonicModule, CommonModule ],
  declarations: [ AlertCmp],
  exports:[],
  providers:[AlertController],
  entryComponents:[AlertCmp],

})
export class ExtendAlertModule { }
