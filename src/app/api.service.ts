import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {Roles} from './const/Role.constant'
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private apiHost:string = `${environment.url}`
  constructor(
    private router:Router,
    private http:HttpClient,
    public toaster:ToastrService
  ) { }

  
redirect(role:string = this.getLocalStorage().role){
  let route = ""
  switch(role){
    default:
    route = "/dashboard/item"
    break;
  }
  this.router.navigateByUrl(route)
  
  }

saveData(data:any =null,mode="save"){
const setData = ['address',"email","name","role","id"]
if(mode === "save" && data){
  sessionStorage.setItem("token",data.token)
  setData.forEach((name)=>{
    localStorage.setItem(name,data['user'][name])
  })
}
else{
  sessionStorage.removeItem("token")
  setData.forEach((name)=>{
    localStorage.removeItem(name)
  })
}
}

get(name:string){
  return this.http.get(`${name}`)
}

delete(name:string,id:string){
return this.http.delete(`${name}/${id}`)
}

patch(name:string,id:string,body:any){
  return this.http.patch(`${name}/${id}`,body)
}

login(body:any){
return this.http.post(`auth/login`,body)
}

post(name:string,body:any){
  return this.http.post(`${name}`,body)
}

getLocalStorage(){
  const name = ['role','id','name']
  let obj:any = {}
  name.forEach((data)=>{
    obj[data] = localStorage.getItem(data) 
  })
  return obj
  }

}
