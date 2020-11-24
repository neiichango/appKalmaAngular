import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoAllComponent } from './pedido-all/pedido-all.component';
import { PedidoCreateComponent } from './pedido-create/pedido-create.component';


const routes: Routes = [
  { path: 'pedido', component: PedidoCreateComponent },
     {path: 'pedido/all', component: PedidoAllComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
