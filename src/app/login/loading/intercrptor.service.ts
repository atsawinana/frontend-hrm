import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class IntercrptorService implements HttpInterceptor {

constructor(public loading: LoadingService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loading.isloading.next(true);

    return next.handle(req).pipe(
      finalize( ()=>
        this.loading.isloading.next(false)
      )
    )
  }

}
