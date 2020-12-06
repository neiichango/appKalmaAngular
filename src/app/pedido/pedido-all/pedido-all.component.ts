import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedido-all',
  templateUrl: './pedido-all.component.html',
  styleUrls: ['./pedido-all.component.css']
})
export class PedidoAllComponent implements OnInit {
 datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService) {

   }

  ngOnInit(): void {
    this.lista();
  }

  lista() {
    this.gService
      .list('kalma/pedido/all')
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


 crearItem() {
    this.router.navigate(['/pedido'], {
    relativeTo: this.route,
    });
  }


/*  module.filter('yesNo', function() {
    return function(input) {
        return input ? 'yes' : 'no';
    }});*/

}
