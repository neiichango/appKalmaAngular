import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {
producto: any;
 imageURL: string;
tallasList: any;
colores: any;
categorias: any;
error: any;
 formCreate: FormGroup;
 makeSubmit: boolean = false;
 destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService

  ) {     this.reactiveForm();

  }


  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required], Validators.pattern('^[A-Za-z]+')],
      description: ['', [Validators.required], Validators.pattern('^[A-Za-z]+')],
      precio: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      color_id: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]],

      tallas: this.fb.array([]),
      talla_id: this.fb.array([]),
      image: [''],

    });
    this.gettallas();
    this.getcategorias();
    this.getcolores();
  }
  ngOnInit(): void {}

  gettallas() {
    return this.gService.list('kalma/talla').subscribe(
      (respuesta: any) => {
        (this.tallasList = respuesta), this.checkboxtallas();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }


  getcategorias() {
     this.gService
      .list('kalma/categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.categorias = data;
      });
  }


  getcolores() {
     this.gService
      .list('kalma/color')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.colores = data;
      });
  }



  get tallas(): FormArray {
    return this.formCreate.get('tallas') as FormArray;
  }
  get talla_id(): FormArray {
    return this.formCreate.get('talla_id') as FormArray;
  }
  private checkboxtallas() {
    this.tallasList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.tallas as FormArray).push(control);
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.talla_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.talla_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.talla_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  //Obtener la imagen o archivo seleccionado
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCreate.get('image').setValue(file);
      // Vista previa imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();
    formData = this.gService.toFormData(this.formCreate.value);
    formData.append('_method', 'POST');
    this.gService
      .create_formdata('kalma/producto', formData)
      .subscribe((respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { register: 'true' },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/producto/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }


}
