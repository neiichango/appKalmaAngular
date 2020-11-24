import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {
 datos: any;
 destroy$: Subject<boolean> = new Subject<boolean>();
 infoVideojuego: any;

  constructor(

    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private gService: GenericService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.lista();
  }

  lista(){
this.gService
      .list('kalma/producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

 agregarProducto(id: number) {
    this.gService
      .get('kalma/producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.infoVideojuego = data;
        this.cartService.addToCart(this.infoVideojuego);
        this.notificacion.mensaje(
          'Pedido',
          'Producto agregado a la orden',
          'success'
        );
      });
  }

}
