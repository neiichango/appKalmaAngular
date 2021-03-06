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
import { ChoferModule } from './chofer/chofer.module';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { EmpaqueModule } from './empaque/empaque.module';
import { FacturaModule } from './factura/factura.module';
import { PersonalModule } from './personal/personal.module';
import { EnvioModule } from './envio/envio.module';




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
    ProductoModule,
    ChoferModule,
    PedidoModule,
    EmpaqueModule,
FacturaModule,
PersonalModule,
EnvioModule,
// al final el gestor de las rutas principal

     AppRoutingModule,
/*ProductoModule,*/
ChoferModule,
PedidoModule,
ClienteModule,

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
