import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  constructor(
    private loadingS:LoadingService
  ) { }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingS.setLoading(true)
    const url = environment.url
    const token = sessionStorage.getItem('token')
    let request = req.clone({
            url: url + req.url
          });
    if(token){
      request = req.clone({
        headers: req.headers.append('Authorization',`bearer ${token}`),
        url: url + req.url
      }); 
    }
    return next.handle(request).pipe(
      finalize(()=>{
       setTimeout(()=>{
        this.loadingS.setLoading(false)
       },1000)
     })
    );       
      }
}
