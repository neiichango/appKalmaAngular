import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { ProductoModule } from './producto/producto.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    // importar otras dependencias que sean necesario cargar en el componente principal.
// importar los módulos creados propios en orden
    CoreModule,
    ShareModule,

    // después los demás módulos

    HomeModule,
    UserModule,
// al final el gestor de las rutas principal

     AppRoutingModule,
ProductoModule,
  ],
  providers: [
       {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptorService,
        multi: true
        }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
