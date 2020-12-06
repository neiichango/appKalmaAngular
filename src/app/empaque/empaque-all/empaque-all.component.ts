import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';



@Component({
  selector: 'app-empaque-all',
  templateUrl: './empaque-all.component.html',
  styleUrls: ['./empaque-all.component.css']
})
export class EmpaqueAllComponent implements OnInit {
  datos1: any;
  datos: any;
  pedido: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService) {

   }

  ngOnInit(): void {

    this.lista();


  }




  listo(id: number) {

 this.gService.get('kalma/pedido', id).subscribe((respuesta: any) => {
      this.pedido = respuesta;

      this.pedido.estadopedido_id = 3;
      this.gService
      .update('kalma/pedido', this.pedido)
      .subscribe((confirma: any) => {
        this.pedido = confirma;

        this.router.navigate(['/empaque/all']);
        /* {


        });*/
        this.notificacion.mensaje('Empaque',
        'Estado Modificado! Pedido Listo para facturar',
        'success'
      );
        this.lista();
      });
    });

  }


  proceso(id: number) {

 this.gService.get('kalma/pedido', id).subscribe((respuesta: any) => {
      this.pedido = respuesta;
      // Obtenida la información del videojuego
      // se construye el formulario
      this.pedido.estadopedido_id = 2;
      this.gService
      .update('kalma/pedido', this.pedido)
      .subscribe((confirma: any) => {
        this.pedido = confirma;

        this.router.navigate(['/empaque/all']);
        this.notificacion.mensaje('Empaque',
        'Estado Modificado! Empaque en proceso',
        'success'
      );
        this.lista();
      });
    });

  }




  lista() {
    this.gService
      .list('kalma/pedido/status/1')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos1 = data;
      });

    this.gService
      .list('kalma/pedido/status/2')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = this.datos1.concat(data) ;
      });
  }
}
