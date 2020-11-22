import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { formatDate } from '@angular/common';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chofer-update',
  templateUrl: './chofer-update.component.html',
  styleUrls: ['./chofer-update.component.css']
})
export class ChoferUpdateComponent implements OnInit {
 chofer: any;
 vehiculos: any;
 error: any;
 formUpdate: FormGroup;
 makeSubmit: boolean = false;
 destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {

  //Desde el constructor obtener el identificar de la ruta
    const id = +this.route.snapshot.paramMap.get('id');
    this.getChofer(id);

  }

getChofer(id: number) {
    this.gService.get('kalma/chofer', id).subscribe((respuesta: any) => {
      this.chofer = respuesta;
      //Obtenida la información del videojuego
      //se construye el formulario
      this.reactiveForm();
    });
  }



  reactiveForm() {

    this.getVehiculos();

    //Si hay información del videojuego
    if (this.chofer) {



      //Cargar la información del videojuego
      //en los controles que conforman el formulario
      this.formUpdate = this.fb.group({
      id: [this.chofer.id, [Validators.required]],
      cedula: [this.chofer.cedula, [Validators.required]],
      nombre: [this.chofer.nombre, [Validators.required]],
      apellido1: [this.chofer.apellido1, [Validators.required]],
      apellido2: [this.chofer.apellido2, [Validators.required]],
      telefono: [this.chofer.telefono, [Validators.required]],
      vehiculo_id: [this.chofer.vehiculo_id, [Validators.required]]
      });

    }
  }
  ngOnInit(): void {}


  getVehiculos() {
   this.gService
      .list('kalma/car')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.vehiculos = data;
      });
  }


 submitForm() {
    this.makeSubmit = true;
    this.gService
      .update('kalma/chofer', this.formUpdate.value)
      .subscribe((respuesta: any) => {
        this.chofer = respuesta;
        this.router.navigate(['/chofer/all'], {
          queryParams: { register: 'true' },
        });
      });
  }



  onReset() {
    this.formUpdate.reset();
  }


  onBack() {
    this.router.navigate(['/chofer/all']);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  }



}
