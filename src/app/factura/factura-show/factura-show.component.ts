import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-factura-show',
  templateUrl: './factura-show.component.html',
  styleUrls: ['./factura-show.component.css']
})
export class FacturaShowComponent implements OnInit {
 datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
 let id = +this.route.snapshot.paramMap.get('id');

  this.obtenerPedido(id);

  }


  obtenerPedido(id: any) {
    this.gService
      .get('kalma/pedido', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
         console.log(data);
         this.datos = data;
      });
  }

}
