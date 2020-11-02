import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferRoutingModule } from './chofer-routing.module';
import { ChoferAllComponent } from './chofer-all/chofer-all.component';
import { ChoferShowComponent } from './chofer-show/chofer-show.component';


@NgModule({
  declarations: [ChoferAllComponent, ChoferShowComponent],
  imports: [
    CommonModule,
    ChoferRoutingModule
  ]
})
export class ChoferModule { }
