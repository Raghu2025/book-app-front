import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserFormComponent } from './component/user-form/user-form.component';
import { Subscription, take } from 'rxjs';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import _ from 'lodash';
// import { User } from '../model/user.interface';
// import { ServerService } from '../server/server.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
@ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
displayedColumns: string[] = ['sn','name','address','email','createdAt','action'];
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

Users:any[] = new Array()
subscription:Subscription[] = new Array()
  constructor(
    private apiServer:ApiService
  ) { 
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
  this.subscription.push(
    this.apiServer.get('user').subscribe((data:any)=>{
       data = data.map((ite:any,index:number)=> ({...ite,sn:index+1}))
      this.Users = data
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort
      this.dataSource.paginator = this.paginator
    })
  )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(){
    this.container?.clear()
    const form = this.container?.createComponent(UserFormComponent)
    form.instance.formOptions = {
      type:"add",
      name:"User"
    }
   this.subscription.push(
    form.instance.userData.subscribe((data:any)=>{
      this.subscription.push(this.apiServer.post("user",data).pipe(
        take(1)
     ).subscribe((data)=>{
        form.instance.reset()
        this.container.clear()
        this.apiServer.toaster.success("Successfully Added")
          this.getUsers()
        },(error)=>{
          this.apiServer.toaster.error("Something went wrong")
          form.instance.error ={
            status:true,
            message:error.error.message || error.error.message[0]
          }
        }))
  
    })
    )
  }

  deleter(id:string){
    this.subscription.push(
      this.apiServer.delete("user",id).subscribe({next:(data)=>{
        this.container.clear()
        this.getUsers()
        this.apiServer.toaster.success("Successfully Deleted")
    },error:()=>{
      this.apiServer.toaster.error("Something went wrong")
    }}))
  }

  updater(data:any){
    this.container?.clear()
    const form = this.container?.createComponent(UserFormComponent)
    form.instance.formOptions = {
      type:"update",
      name:"User",
      data:data
    }

   this.subscription.push(
    form.instance.userData.subscribe((data:any)=>{
      this.subscription.push(this.apiServer.patch("user",data.id,data).subscribe({next:(data)=>{
          this.container.clear()
          form.instance.reset()
          this.apiServer.toaster.success("Successfully updated")
          this.getUsers()
        },error:()=>{
          this.apiServer.toaster.error("Something went wrong")
        }}))
  
    })
    ) 
  }

  ngOnDestroy(){
   this.container.clear()
   this.subscription.forEach(sub => sub.unsubscribe())
  }

  // filter(){
  //   const filteredData = _.cloneDeep(this.Users)
  //   const data = _.filter(filteredData,(usr:any)=> usr.role===this.roleSelect)
  //   this.dataSource = new MatTableDataSource(data) 
  //   return
  // }

}
