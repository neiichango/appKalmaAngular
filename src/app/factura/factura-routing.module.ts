import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaAllComponent } from './factura-all/factura-all.component';
import { FacturaShowComponent } from './factura-show/factura-show.component';


const routes: Routes = [
  { path: 'factura/all', component: FacturaAllComponent },
    {path: 'factura/:id', component: FacturaShowComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
