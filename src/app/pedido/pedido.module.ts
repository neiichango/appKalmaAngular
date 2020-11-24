import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoAllComponent } from './pedido-all/pedido-all.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PedidoCreateComponent } from './pedido-create/pedido-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PedidoAllComponent, PedidoCreateComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PedidoModule { }
