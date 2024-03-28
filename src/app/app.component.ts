import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
loading:boolean = false
  constructor(
    private loadingService:LoadingService
  ){}
  ngOnInit(): void {
    this.listenToLoading()
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading:boolean) => {
        this.loading = loading;
      });
  }


}
