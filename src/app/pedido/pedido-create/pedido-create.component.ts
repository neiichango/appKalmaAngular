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

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit {
 items: ItemCart[] = [];
  total = 0;
  clientes: any;
  pedido:any;
  fecha = new Date();
  formCreate: FormGroup;
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
    this.total = this.cartService.getTotal();

    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
    this.reactiveForm();
  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Pedido', 'Cantidad actualizada', 'success');
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Pedido', 'Producto eliminado de la orden', 'warning');
  }
  ordenar() {
    if (this.qtyItems > 0) {
      let detalles = { detalles: this.cartService.getItems() };
      this.gService
        .create('kalma/pedido', detalles)
        .subscribe((respuesta: any) => {
          this.noti.mensaje(
            'Pedido',
            'Pedido registrado satisfactoriamente',
            'success'
          );
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          this.total = this.cartService.getTotal();
        });
    } else {
      this.noti.mensaje('Pedido', 'Agregue videojuegos a la orden', 'warning');
    }
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cliente_id: ['', [Validators.required]],
    });
    this.getClientes();
  }


  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();
    formData = this.gService.toFormData(this.formCreate.value);
    formData.append('_method', 'POST');
    this.gService
      .create_formdata('kalma/producto', formData)
      .subscribe((respuesta: any) => {
        this.pedido = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { register: 'true' },
        });
      });
  }

  getClientes() {
     this.gService
      .list('kalma/cliente')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.clientes = data;
      });
  }


}
