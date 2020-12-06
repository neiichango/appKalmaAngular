import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';

import { FacturaAllComponent } from './factura-all/factura-all.component';

import { FacturaShowComponent } from './factura-show/factura-show.component';


@NgModule({
  declarations: [ FacturaAllComponent, FacturaShowComponent],
  imports: [
    CommonModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
