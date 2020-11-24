import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';



const routes: Routes = [
{path: 'producto', component: ProductoIndexComponent},
  { path: 'producto/create', component: ProductoCreateComponent },
  {path: 'producto/all',  component: ProductoAllComponent},
  { path: 'producto/:id', component: ProductoShowComponent },
  { path: 'producto/update/:id', component: ProductoUpdateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule {}
