import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRoute: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {
    console.log(this.productoForm);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id !== null) {
      // Editamos producto
      this._productoService.editProducto(this.id, PRODUCTO).subscribe(
        (data) => {
          this.toastr.info(
            'Se ha actualizado correctamente',
            'Producto actualizado'
          );
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.productoForm.reset();
        }
      );
    } else {
      //agregar producto
      this._productoService.saveProdcuto(PRODUCTO).subscribe(
        (data) => {
          this.toastr.success('Se ha registrado correctamente', 'Producto');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.productoForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.getProducto(this.id).subscribe((data) => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }
}
