import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpaqueAllComponent } from './empaque-all/empaque-all.component';
import { EmpaqueShowComponent } from './empaque-show/empaque-show.component';


const routes: Routes = [
  { path: 'empaque/all', component: EmpaqueAllComponent },
    {path: 'empaque/:id', component: EmpaqueShowComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpaqueRoutingModule { }
