import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public myForm:FormGroup = this._fb.group({
    name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]]
  });

  public message:string[] = [];

  constructor( 
    private _fb: FormBuilder,
    private _authService: AuthService ,
    private _router:Router,
  ) { }


  register() {
    const { name, email, password } = this.myForm.value; //! name = this.myForm.value.name

    this._authService.register(name, email, password, 1)
      .subscribe(result => {
        if (result === true) {
          Swal.fire(
            'Enhorabuena!',
            'Usuario creado correctamente',
            'success'
          );
          this._router.navigateByUrl('/pages');
        } else {

          //TODO: mostrar message de error
          //valida los errores (validaciones) desde la base de datos

          if (result.msg) { //! USUARIO YA EXISTE CON EL EMAIL - ERROR DE SERVIDOR
            setTimeout(() => {
              this.message.push(result.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }

          if (result.errors?.name) { //! NO HAY VALIDACIÖN POR PARTE DE LOS CAMPOS
            setTimeout(() => {
              this.message.push(result.errors.name.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }
          if (result.errors?.email) {
            setTimeout(() => {
              this.message.push(result.errors.email.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }

          if (result.errors?.password) {
            setTimeout(() => {
              this.message.push(result.errors.password.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }

        }
      })
  }

  fieldIsValidReactive(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  fieldErrors(field:string){
    
    return this.myForm.controls[field].errors
  }
}
