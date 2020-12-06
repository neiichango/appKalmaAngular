import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EventManager } from '@angular/platform-browser';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit {
 items: ItemCart[] = [];
  subtotal = 0;
  total = 0;
  gastoimpuesto = 0 ;
  gastoenvio = 0;
  clientes: any;
  express: any;
  pedido: any;
  fecha = new Date();
  formCreate: FormGroup;
  provincias: any;
  provincia: any;
  direccion: any;
  qtyItems = 0;
   makeSubmit: boolean = false;
 destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router
  ) {
  }



  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.subtotal = this.cartService.getTotal();
    this.gastoimpuesto = this.subtotal * 0.13;
    this.total = this.subtotal + this.gastoimpuesto + this.gastoenvio;
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
    this.reactiveForm();
  }


  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.subtotal = this.cartService.getTotal();
    this.gastoimpuesto = this.subtotal * 0.13;
    this.total = this.subtotal + this.gastoimpuesto + this.gastoenvio;
    this.noti.mensaje('Pedido', 'Cantidad actualizada', 'success');
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.subtotal = this.cartService.getTotal();
    this.gastoimpuesto = this.subtotal * 0.13;
    this.total = this.subtotal + this.gastoimpuesto + this.gastoenvio;
    this.noti.mensaje('Pedido', 'Producto eliminado de la orden', 'warning');
  }

   public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      cliente_id: ['', [Validators.required]],
      express: ['', [Validators.required]],
      provincia_id: [''],
      direccion: ['', [Validators.required]],
      subtotal:['', [Validators.required]],
      total: ['', [Validators.required]],
      gastoimpuesto : ['', [Validators.required]],
      gastoenvio : ['', [Validators.required]],
    });
    this.getClientes();
    this.getProvincias();
  }

/*
  submitForm() {
    this.makeSubmit = true;
//let genderValue = this.form.value.gender;
    let formData = new FormData();
    formData = this.gService.toFormData(this.formCreate.value);
    formData.append('_method', 'POST');
    for (let item of this.items) {
      console.log(item.idItem);
      console.log(this.items[item.idItem]);
      // formData.append('detalles[]' ,  this.items[item.idItem]);
      }


   // formData.append('detalles' , angular.toJson(this.items))

    this.gService.create_formdata('kalma/pedido', formData)
      .subscribe((respuesta: any) => {
        this.pedido = respuesta;
        this.router.navigate(['/pedido/all'], {
          queryParams: { register: 'true' },
        });
      });
  }
*/

  getClientes() {
     this.gService
      .list('kalma/cliente')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.clientes = data;
      });
  }

 getProvincias() {
     this.gService
      .list('kalma/provincia')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.provincias = data;

      });
  }



onCheckboxChange( event) {
    this.provincia = this.formCreate.value.provincia_id;
    console.log(this.provincia);
    if (this.provincia > 0 && this.provincia <= 4 ) {
      this.gastoenvio = 2000;

      this.gastoimpuesto = this.subtotal * 0.13;
      this.total = this.subtotal + this.gastoimpuesto + this.gastoenvio;
    }else{
      this.gastoenvio = 2500;

      this.gastoimpuesto = this.subtotal * 0.13;
      this.total = this.subtotal + this.gastoimpuesto + this.gastoenvio;
    }

  }

onCheckChange( event) {
    this.express = this.formCreate.value.express;
    console.log(this.express);

    if (this.express == true) {
      this.formCreate.controls['provincia_id'].enable();
      this.formCreate.controls['direccion'].enable();
      this.onCheckboxChange(null);

    }else{
      this.formCreate.controls['direccion'].disable();
      this.formCreate.controls['provincia_id'].disable();
      this.gastoenvio = 0;
      this.gastoimpuesto = this.subtotal * 0.13;
      this.total = this.subtotal + this.gastoimpuesto + this.gastoenvio;
    }


  }




  ordenar() {

    this.makeSubmit = true;
    this.formCreate.value.gastoenvio = this.gastoenvio;
    this.formCreate.value.gastoimpuesto = this.gastoimpuesto;
    this.formCreate.value.subtotal = this.subtotal;
    this.formCreate.value.total = this.total;
    this.formCreate.value.estadopedido_id = 1;
    let detalles = { detalles: this.cartService.getItems() };
    this.formCreate.value.detalles = detalles;
    this.gService
      .create('kalma/pedido', this.formCreate.value)
      .subscribe((respuesta: any) => {
          this.noti.mensaje('Orden' , 'Orden registrada satisfactoriamente', 'sucess');
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          this.total = this.cartService.getTotal();
          this.gastoenvio = 0;
          this.gastoimpuesto = 0;
          this.direccion = '';
        });

/*
    if (this.qtyItems > 0) {
      let detalles = { detalles: this.cartService.getItems() };
      this.gService
        .create('videojuego/orden', detalles)
        .subscribe((respuesta: any) => {
          this.noti.mensaje('Orden' , 'Orden registrada satisfactoriamente', 'sucess');
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          this.total = this.cartService.getTotal();
        });
    } else {
      this.noti.mensaje('Orden', 'Agregue videojuegos a la orden', 'warning');
    }
    */
  }















}


