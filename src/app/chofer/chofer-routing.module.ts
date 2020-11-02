import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoferAllComponent } from './chofer-all/chofer-all.component';
import { ChoferShowComponent } from './chofer-show/chofer-show.component';


const routes: Routes = [

 {
    path: 'chofer/all',
    component: ChoferAllComponent,
  },
   { path: 'chofer/:id', component: ChoferShowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoferRoutingModule { }
