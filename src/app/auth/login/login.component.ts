import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public messages:string[] = [];

  constructor( 
    private _fb:FormBuilder,
    private _authService: AuthService,
    private _router:Router
   ){}


  public myForm: FormGroup = this._fb.group({
    email: [ '', [ Validators.email,Validators.required ] ],
    password: [ '', [ Validators.required,Validators.minLength(6) ] ],
  })

  login(){

    const { email,password } = this.myForm.value

    this._authService.login(email,password)
    .subscribe( (ok:any) => {
      if(ok === true){
        // localStorage.setItem('token')
        this._router.navigateByUrl('/pages')
      }else{
        //TODO: mostrar mensaje de error
        //valida los errores (validaciones) desde la base de datos
        if(ok.msg){
          setTimeout(() => {
            this.messages.push(ok.msg) ;
          }, 300);

          setTimeout(()=>{
            this.messages=[];
          },4000)
        }
       if(ok.errors?.email){
        setTimeout(() => {
          this.messages.push(ok.errors.email.msg);
        }, 300);

        setTimeout(()=>{
          this.messages=[];
        },4000)
       }

       if(ok.errors?.password){
        setTimeout(() => {
          this.messages.push(ok.errors.password.msg);
        }, 300);

        setTimeout(()=>{
          this.messages=[];
        },4000)
       }

      }
    })



  }

  fieldIsValidReactive(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  fieldErrors(field:string){
    console.log( this.myForm.controls[field].errors);
    return this.myForm.controls[field].errors;
  }

}
