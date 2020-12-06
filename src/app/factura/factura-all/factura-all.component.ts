import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';


@Component({
  selector: 'app-factura-all',
  templateUrl: './factura-all.component.html',
  styleUrls: ['./factura-all.component.css']
})
export class FacturaAllComponent implements OnInit {
  datos: any;
  pedido: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private router: Router,
               private route: ActivatedRoute,
               private gService: GenericService,
               private notificacion: NotificacionService) { }

  ngOnInit(): void {

     this.lista();
  }

 lista() {
    this.gService
      .list('kalma/pedido/status/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
/*
    this.gService
      .list('kalma/pedido/status/2')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = this.datos1.concat(data) ;
      });*/
  }



  facturar(id: number) {
/*
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
    });*/
  }


}
