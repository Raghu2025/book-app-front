import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import _ from 'lodash';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
baseUrl:string = environment.url
@ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
displayedColumns: string[] = ['sn',"image",'title','category','price','author','createdAt','description','action'];
statuses = ["all","active","inactive"]
dataSource!: MatTableDataSource<any>;
categorys:any[] = []
categorySelect:string = 'all'
statusSelect:string = 'all'


@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;


  Items:any[] = new Array()
  subscription:Subscription[] = new Array()
    constructor(
      private apiService:ApiService 
    ) {

     }
  
    ngOnInit(): void {
      this.getCategory()
      this.getItems()

    }
  
    getItems(){
    let url = 'product'
    this.subscription.push(
      this.apiService.get(url).subscribe((data:any)=>{
        data = data.map((ite:any,index:number) => ({...ite,sn:index+1}))
        this.dataSource = new MatTableDataSource(data);
        this.Items = data
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
      const form = this.container?.createComponent(ItemFormComponent)
      form.instance.formOptions = {
        type:"add",
        name:"Item"
      }
  
     this.subscription.push(
      form.instance.ItemData.subscribe((data:any)=>{
        this.subscription.push(
          this.apiService.post("product",data).subscribe({
            next:(data)=>{
              this.container.clear()
              this.getItems()
              this.apiService.toaster.success("Succesfully added")
            },
            error:(err)=>{
              this.apiService.toaster.error(`${err.error.message || err.error.message[0]}`)
            }
          })
          )
    
      })
      )
    }
  
    deleter(id?:string){
      this.subscription.push(this.apiService.delete("product",id as string,).subscribe({
        next:(data)=>{
          this.container.clear()
          this.getItems()
          this.apiService.toaster.success("Succesfully Deleted")
        },
        error:(err)=>{
          this.apiService.toaster.error(`${err.error.message || err.error.message[0]}`)
        }
      }))
    }
  
  
    updater(data:any){
      this.container?.clear()
      const form = this.container?.createComponent(ItemFormComponent)
      form.instance.formOptions = {
        type:"update",
        name:"Item",
        data:data
      }
  
     this.subscription.push(
      form.instance.ItemData.subscribe((data:any)=>{
        this.subscription.push(
          this.apiService.patch("product",data.get('id') as string,data).subscribe({
            next:(data)=>{
              this.container.clear()
              this.getItems()
              this.apiService.toaster.success("Succesfully updated")
            },
            error:(err)=>{
              this.apiService.toaster.error(`${err.error.message || err.error.message[0]}`)
            }
          })
          )
    
      })
      ) 
    }

    errorImage(event:any){
     event.target.src = "assets/icons/imageError.png"
    }

    changeStatus(data:any){
    this.subscription.push(
      this.apiService.patch('product',data.id,{isArchive:!data.isArchive}).subscribe({
        next:(data)=>{
          this.container.clear()
          this.getItems()
          this.apiService.toaster.success("Succesfully updated")
        },
        error:(err)=>{
          this.apiService.toaster.error(`${err.error.message || err.error.message[0]}`)
        }
      })
    )
    }

    getCategory(){
      this.subscription.push(
        this.apiService.get('category').subscribe((data:any)=>{
          this.categorys = data
        })
      )
      }
    

      

    filter(name:string){
      const filteredData = _.cloneDeep(this.Items)
      if(this.categorySelect==="all" && this.statusSelect === "all") {
        this.dataSource = new MatTableDataSource(this.Items)
        this.dataSource.sort=this.sort
        this.dataSource.paginator = this.paginator
        return
      }

      const data = _.filter(filteredData,(ite:any)=> {
        if(name==="isArchive"){
         return this.statusSelect==="active"?!ite.isArchive:ite.isArchive
        }
        if(name==="category"){
          return ite.category.id === this.categorySelect
        }
        else{
          return (ite.category.id === this.categorySelect) && !ite.isArchive
        }
        
      })
       this.dataSource = new MatTableDataSource(data) 
       this.dataSource.sort=this.sort
       this.dataSource.paginator = this.paginator

    }
  
    ngOnDestroy(){
     this.container.clear()
     this.subscription.forEach(sub => sub.unsubscribe())
    }
}
