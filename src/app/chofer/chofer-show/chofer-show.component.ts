import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-chofer-show',
  templateUrl: './chofer-show.component.html',
  styleUrls: ['./chofer-show.component.css']
})
export class ChoferShowComponent implements OnInit {
datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.obtenerChofer(id);
  }


  obtenerChofer(id: any) {
    this.gService
      .get('kalma/chofer', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
         console.log(data);
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}
