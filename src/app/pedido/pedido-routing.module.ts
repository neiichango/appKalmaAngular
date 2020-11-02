import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoAllComponent } from './pedido-all/pedido-all.component';


const routes: Routes = [

 {
    path: 'pedido/all',
    component: PedidoAllComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
