import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferRoutingModule } from './chofer-routing.module';
import { ChoferAllComponent } from './chofer-all/chofer-all.component';
import { ChoferShowComponent } from './chofer-show/chofer-show.component';
import { ChoferCreateComponent } from './chofer-create/chofer-create.component';
import { ChoferUpdateComponent } from './chofer-update/chofer-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChoferAllComponent, ChoferShowComponent, ChoferCreateComponent, ChoferUpdateComponent],
  imports: [
    CommonModule,
    ChoferRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChoferModule { }
