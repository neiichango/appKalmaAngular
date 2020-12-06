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
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css']
})
export class ProductoUpdateComponent implements OnInit {
producto: any;
 imageURL: string;
tallasList: any;
colores: any;
categorias: any;
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

    const id = +this.route.snapshot.paramMap.get('id');
    this.getProducto(id);

   }



getProducto(id: number) {
    this.gService.get('kalma/producto', id).subscribe((respuesta: any) => {
      this.producto = respuesta;
      // Obtenida la información del videojuego
      // se construye el formulario
      this.reactiveForm();
    });
  }




  reactiveForm() {

    this.getcategorias();
    this.getcolores();
    this.gettallas();



    // Si hay información del videojuego
    if (this.producto) {
      this.formUpdate = this.fb.group({
      id: [this.producto.id, [Validators.required]],
      name: [this.producto.name, [Validators.required]],
      description: [this.producto.description, [Validators.required]],
      precio: [this.producto.precio, [Validators.required]],
      color_id: [this.producto.color_id, [Validators.required]],
      categoria_id: [this.producto.categoria_id, [Validators.required]],
      tallas: this.fb.array([]),
      talla_id: this.fb.array([]),
      image: [''],
      });
      this.imageURL = this.producto.pathImagen;
    }
  }

  ngOnInit(): void {}


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


  get tallas(): FormArray {
    return this.formUpdate.get('tallas') as FormArray;
  }
  get talla_id(): FormArray {
    return this.formUpdate.get('talla_id') as FormArray;
  }

   private checkboxtallas() {
    // Recorrer la lista de tallas y especificar si esta seleccionado
    this.tallasList.forEach((o) => {
      let selected = false;
      if (this.producto.talla.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.tallas as FormArray).push(control);
      if (selected) {
        // Agregar al array de id seleccionados
        (this.formUpdate.controls.talla_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }


  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.talla_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.talla_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.talla_id as FormArray).removeAt(i);
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
      this.formUpdate.get('image').setValue(file);
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
    formData = this.gService.toFormData(this.formUpdate.value);
    formData.append('_method', 'PATCH');
    this.gService
      .update_formdata('kalma/producto', formData)
      .subscribe((respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { update: 'true' },
        });
      });
  }

  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(['/producto/all']);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  }


}
