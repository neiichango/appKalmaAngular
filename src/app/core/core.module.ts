import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// de aqui tuve que eliminar el header del declarations y el e

@NgModule({
  declarations: [ HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule { }
