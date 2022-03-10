import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectOptions } from '../app.state';
import { actionHistoryPush } from '../history/redux/history.actions';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {
  token: any;
  stateOptions$ = this.store.select(selectOptions);
  constructor(private store: Store<AppState>) {
    this.stateOptions$.subscribe(state=>this.token = state.bearerToken);
    document.addEventListener('url',  (e:any) =>{
      const data = JSON.parse(e.detail)
      this.store.dispatch(actionHistoryPush(data))
    
    }, false);
    this.globalInterceptor()}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      const token = this.token
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request)
    // .pipe(
    //   map((event:any) => {
    //     console.log('Request: ', request);
    //     if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
    //     } else{ 
    //       if(event.status === 200){
    //         const history:HistoryModel = {
    //           params:request.body,
    //           status:Number(event.status),
    //           response:event.body,
    //           url:event.url
    //         }
    //         this.store.dispatch(actionHistoryPush(history))
    //       } 
    //     }
    //     return event;
    //   }),
    //   catchError((err: any) => {
    //     console.log(err)
    //      if (err instanceof HttpErrorResponse) {
    //       const history:HistoryModel = {
    //         params:request.body,
    //         status:Number(err.status),
    //         response:err.error,
    //         url:err.url || ''
    //       }
    //       this.store.dispatch(actionHistoryPush(history))
    //      }
    //      return throwError(()=>err)
    //   })
    // )
  }
  globalInterceptor() {
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      console.log(this)
      
          let oldReady = this.onreadystatechange;
          this.onreadystatechange = function () {
           if(this.response && this.status && this.readyState == 4){
            const event =  new CustomEvent('url', { detail: JSON.stringify( {
              params:'',
              status:this.status,
              response:this.response,
              url:this.responseURL
            }) });
            document.dispatchEvent(event);
           }
          };
        origOpen.apply(this, (arguments as any));
    };
  }
}