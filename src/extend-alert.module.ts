/**
 * Created by hsuanlee on 2017/2/20.
 */
import { NgModule }           from '@angular/core';

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
