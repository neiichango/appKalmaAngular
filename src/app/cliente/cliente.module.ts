import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './cliente-update/cliente-update.component';


@NgModule({
  declarations: [ClienteCreateComponent, ClienteUpdateComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
