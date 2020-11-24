import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';


@Component({
  selector: 'app-chofer-create',
  templateUrl: './chofer-create.component.html',
  styleUrls: ['./chofer-create.component.css']
})
export class ChoferCreateComponent implements OnInit {
 chofer: any;
 vehiculos: any;
 error: any;
 formCreate: FormGroup;
 makeSubmit: boolean = false;
 destroy$: Subject<boolean> = new Subject<boolean>();
 

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {

    this.reactiveForm();
  }


  reactiveForm() {
    this.formCreate = this.fb.group({
      cedula: ['', [Validators.required], Validators.pattern('^[0-9]-?\d{4}-?\d{4}$')],
      nombre: ['', [Validators.required], Validators.pattern('^[A-Za-z]+')],
      apellido1: ['', [Validators.required], Validators.pattern('^[A-Za-z]+')],
      apellido2: ['', [Validators.required], Validators.pattern('^[A-Za-z]+')],
      telefono: ['', [Validators.required],  Validators.pattern('^[0-9]{8}$')],
      vehiculo_id: ['', [Validators.required]]
    });
    this.getvehiculos();
  }

  ngOnInit(): void {}


  getvehiculos() {
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
      .create('kalma/chofer', this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.chofer = respuesta;
        this.router.navigate(['/chofer/all'], {
          queryParams: { register: 'true' },
        });
      });
  }

  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/chofer/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }



}
