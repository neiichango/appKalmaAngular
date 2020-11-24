import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductoIndexComponent, ProductoShowComponent, ProductoAllComponent, ProductoCreateComponent, ProductoUpdateComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
