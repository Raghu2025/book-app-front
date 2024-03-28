import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-our-product',
  templateUrl: './our-product.component.html',
  styleUrls: ['./our-product.component.css']
})
export class OurProductComponent {
products:any = [];
baseUrl:string = environment.url
  constructor(public apiService: ApiService){}


  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.apiService.get(`product`).subscribe((data:any)=>{
      this.products = data
    })
  }

}
