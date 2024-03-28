import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  constructor(private router:Router,private apiService:ApiService){

  }

 ngOnInit(): void {
   
 }

  signOut(){
    this.apiService.saveData(null,"remove")
    this.router.navigateByUrl("/login")
  }

  get getName(){
    const Name = localStorage.getItem("name") 
    return Name?.substring(0,2)
  }

  allowedTo(...role:Array<string>){
  const roleOf = localStorage.getItem('role') || ""
  const allowedRole = [...role]
  if(allowedRole.includes(roleOf)){
   return true
  }
  else{
    return false
  }
  }

}
