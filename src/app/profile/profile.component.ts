import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userForm!:FormGroup 
userId:string = ""
Subscription:Subscription[] = []
submitted:boolean = false
  constructor(
    private apiService:ApiService,
    private formBuilder:FormBuilder

  ){}

  ngOnInit(): void {
    this.formInit()
    this.getUserById()
    
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

  getUserById(){
  this.userId = localStorage.getItem('id') as string
  this.Subscription.push(
    this.apiService.get(`user/${this.userId}`).subscribe((data)=>{
      console.log(data)
      this.userForm.patchValue({
        ...data
      })
    })

  )

  }

  submit(){
    const value =  {...this.userForm.value,mobile:parseInt(this.userForm.value.mobile)}
    this.Subscription.push(this.apiService.patch("user",this.userId,value).subscribe({
      next:(data)=>{
        this.apiService.toaster.success("Successfully updated")
        this.getUserById()
      },
      error:(err)=>{
        this.apiService.toaster.error(err.error.message || err.error.message[0])
        this.getUserById()
      }
    }))
  }

  ngOnDestroy(){
    this.Subscription.forEach(sub => sub.unsubscribe())
  }
  
}
