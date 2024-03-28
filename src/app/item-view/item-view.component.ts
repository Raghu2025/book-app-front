import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  baseUrl:string = environment.url
 subscription:Subscription[] = []
 itemId:string = ""
 itemValue:any 
 bidItem:any[] = []
  constructor(
    private route:ActivatedRoute,
    private apiService:ApiService

  ){}

  ngOnInit(): void {
    this.getId()
    this.getProduct()
  }

  getId(){
  this.subscription.push(
    this.route.params.subscribe((data:any)=>{
      this.itemId = data.id
    })
  )}

  getProduct(){
  this.subscription.push(
    this.apiService.get(`product/single/${this.itemId}`).subscribe({
    next:(res)=>{
      this.itemValue = res
    },
    error:(err)=>{
  
    }
    })
  )
  }





}