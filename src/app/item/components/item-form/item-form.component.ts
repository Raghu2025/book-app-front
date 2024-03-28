import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  @Input() formOptions!:any
  @Output() ItemData:EventEmitter<any> = new EventEmitter()
  ItemForm:FormGroup = new FormGroup({})
  formData:FormData = new FormData()
  submitted:boolean = false
  categorys:any[] = []
  subscription:Subscription[] = []
  Users:any[] = []
    constructor(
      private formBuilder:FormBuilder,
      private apiService:ApiService
    ) { }
  
  
    ngOnInit(): void {
      this.getCategory()
      this.getUsers()
      this.formInit()
      if(this.formOptions){
      if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
        this.patchValue({...this.formOptions.data,category:this.formOptions.data.category.id})
      }
      }
    }


    getUsers(){
      this.subscription.push(
        this.apiService.get('user').subscribe((data:any)=>{
          this.Users = data.filter((data:any)=> data.role === "seller")
        })
      )
      }
  
  formInit(){
    this.ItemForm = this.formBuilder.group({
      title:['',[
        Validators.required
      ]],
      price:[0,[
        Validators.required
      ]],
      publication:['',[
        Validators.required
      ]],
      category:['',[
        Validators.required
      ]],
      description:['',[
        Validators.required
      ]],
      author:['',[
        Validators.required
      ]],
    })
  
  }
  
    // For Image viewer while adding image
   setImage(image: any) {
        this.formData.set('image', image.target.files[0]) 
    }


    getCategory(){
      this.subscription.push(
        this.apiService.get('category').subscribe((data:any)=>{
          this.categorys = data
        })
      )
      }


  patchValue(data:any){
    this.ItemForm.patchValue({
  ...data
    })
  }
  
  reset(){
  this.ItemForm.reset()
  }
  
  submit(){
  this.submitted = true
  if(this.ItemForm.invalid) return
  let value =this.ItemForm.value
  if(this.formOptions.type==="update"){
    value = {
      ...this.formOptions.data,
      ...this.ItemForm.value
    }
    delete value.image
  }
  Object.keys(value).forEach((data)=>{
    this.formData.set(data,value[data])
  })
  this.ItemData.emit(this.formData)
  this.submitted = false
  }
  
  
}
