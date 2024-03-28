import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { categoryFormComponent } from './components/category-form/category-form';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class categoryComponent implements OnInit {
  @ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
  categoryForm:FormGroup = new FormGroup({})
  submitted:Boolean = false
  categorys:any[] = new Array()
  subscription:Subscription[] = new Array()

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.getCategory()
  }




  
  getCategory(){
    this.subscription.push(
      this.apiService.get('category').subscribe((data:any)=>{
        this.categorys = data
      })
    )
    }
  
  openModal(){
    this.container?.clear()
    const form = this.container?.createComponent(categoryFormComponent)
    form.instance.formOptions = {
        type:"add",
        name:"category"
      }
  this.subscription.push(
  form.instance.categoryData.subscribe((data:any)=>{
  this.subscription.push(
    this.apiService.post("category",data).subscribe({
      next:(data)=>{
        this.container.clear()
        this.apiService.toaster.success("SucessFully added")
        this.getCategory()
      },
      error:(err)=>{
        this.apiService.toaster.error(`${err.error.message || err.error.message[0]},Please try again`)
      }
    })
     )
    
      })
      )
    }
  
  deleter(id:string){
  this.subscription.push(
    this.apiService.delete("category",id).subscribe((data)=>{
      this.container.clear()
      this.getCategory()
      this.apiService.toaster.success("SucessFully deleted")
  })
  )
  }
  
    updater(data:any){
      this.container?.clear()
      const form = this.container?.createComponent(categoryFormComponent)
      form.instance.formOptions = {
        type:"update",
        name:"category",
        data:data
      }
     this.subscription.push(
      form.instance.categoryData.subscribe((data:any)=>{
        this.subscription.push(
          this.apiService.patch("category",data.id,data).subscribe({
            next:(data)=>{
              this.container.clear()
              this.apiService.toaster.success("SucessFully updated")
              this.getCategory()
            },
            error:(err)=>{
              this.apiService.toaster.error(`${err.error.message || err.error.message[0]},Please try again`)
            }
          })
          )
    
      })
      ) 
    }
  
    ngOnDestroy(){
     this.container.clear()
     this.subscription.forEach(sub => sub.unsubscribe())
    }

}
