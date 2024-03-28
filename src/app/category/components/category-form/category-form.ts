import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  styleUrls: ['./category-form.css']
})
export class categoryFormComponent implements OnInit {
  @Input() formOptions:any
  @Output() categoryData:EventEmitter<any> = new EventEmitter()
  roleForm:FormGroup = new FormGroup({})
  submitted:boolean = false
    constructor(
      private formBuilder:FormBuilder
    ) { }
  
  
    ngOnInit(): void {
      this.formInit()
      if(this.formOptions){
      if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
        this.patchValue(this.formOptions.data)
      }
      }
    }
  
  
  formInit(){
    this.roleForm = this.formBuilder.group({
      name:['',[
        Validators.required
      ]]
    })
  
  }
  
  patchValue(data:any){
    this.roleForm.patchValue({
  ...data
    })
  }
  
  reset(){
  this.roleForm.reset()
  }
  
  submit(){
  this.submitted = true
  if(this.roleForm.invalid) return
  let value =this.roleForm.value
  if(this.formOptions.type==="update"){
    value = {
      ...this.formOptions.data,
      ...this.roleForm.value
    }
  }
  this.categoryData.emit(value)
  this.submitted = false
  }
}
