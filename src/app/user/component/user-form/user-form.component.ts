import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Roles} from "../../../const/Role.constant"


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
@Input() formOptions!:any
@Output() userData:EventEmitter<any> = new EventEmitter()
userForm:FormGroup = new FormGroup({})
submitted:boolean = false
subscription:Subscription[] = []
error={
status:false,
message:""
}
Roles:any
  constructor(
    private formBuilder:FormBuilder
  ) { }


  ngOnInit(): void {
    this.formInit();
    if(this.formOptions){
    if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
      this.patchValue(this.formOptions.data as any)
    }
    }
  }



formInit(){
  this.userForm = this.formBuilder.group({
    name:['',[
      Validators.required
    ]],
    role:['',[
      Validators.required
    ]],
    email:['',[
      Validators.required,
      Validators.email
    ]],
    mobile:["",[
     Validators.required,
     Validators.minLength(10),
     Validators.maxLength(10)
    ]],
    address:["",
    Validators.required
  ],
    password:['',[
      Validators.required
    ]]
  })

}

patchValue(data:any){
  this.userForm.patchValue({
...data
  })
}

reset(){
this.userForm.reset()
}

submit(){
this.submitted = true
console.log(this.userForm)
if(this.userForm.invalid && this.formOptions.type!=="update") return
let value ={...this.userForm.value,mobile:parseInt(this.userForm.value.mobile)}
if(this.formOptions.type==="update"){
  value = {
    ...this.formOptions.data,
    ...this.userForm.value,
    mobile:parseInt(this.userForm.value.mobile)
  }
}
this.submitted = false
this.userData.emit(value)

}


}

