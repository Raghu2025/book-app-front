import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup = new FormGroup({})
submitted:Boolean = false
error = {
  status:false,
  message:""
}
constructor(private formBuilder:FormBuilder,private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
  this.loginFormInit()
  }


loginFormInit(){
this.loginForm = this.formBuilder.group({
  email:['',[
    Validators.required,
    Validators.email
  ]],
  password:['',[
    Validators.required
  ]]
})
}

submit(){
this.error.message = ""
 this.submitted = true
 if(this.loginForm.invalid) return
 this.apiService.login(this.loginForm.value).subscribe({
  next:(data:any)=>{
  this.apiService.saveData(data,"save")
  this.apiService.redirect(data.user.role)
  },error:(error) =>{
        this.error = {
        status:true,
        message:`${error.error.message || ""},Please verify your email and password or contact admin` 
      }
      this.apiService.toaster.error(error.error.message || "Something went Wrong" )
  }

 })
}


resetForm(){
this.loginForm.reset()
}


}
