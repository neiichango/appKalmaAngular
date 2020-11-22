import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoferAllComponent } from './chofer-all/chofer-all.component';
import { ChoferCreateComponent } from './chofer-create/chofer-create.component';
import { ChoferShowComponent } from './chofer-show/chofer-show.component';
import { ChoferUpdateComponent } from './chofer-update/chofer-update.component';


const routes: Routes = [

 {
    path: 'chofer/all',
    component: ChoferAllComponent,
  },
   { path: 'chofer/create', component: ChoferCreateComponent },
   { path: 'chofer/:id', component: ChoferShowComponent },
   { path: 'chofer/update/:id', component: ChoferUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoferRoutingModule { }
