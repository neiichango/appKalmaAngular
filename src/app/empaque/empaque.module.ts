import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpaqueRoutingModule } from './empaque-routing.module';
import { EmpaqueAllComponent } from './empaque-all/empaque-all.component';
import { EmpaqueShowComponent } from './empaque-show/empaque-show.component';


@NgModule({
  declarations: [EmpaqueAllComponent, EmpaqueShowComponent],
  imports: [
    CommonModule,
    EmpaqueRoutingModule
  ]
})
export class EmpaqueModule { }
