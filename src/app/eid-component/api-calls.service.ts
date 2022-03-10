import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState, selectOptions } from '../app.state';
import { PrepareParamsPipe } from '../globals/prepare-params.pipe';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  stateOptions$ = this.store.select(selectOptions);

  constructor(private http: HttpClient,private store: Store<AppState>) { }
    
  async getAuthorization(url:string){
    const options = await firstValueFrom(this.stateOptions$);
    const prepareParams = new PrepareParamsPipe()
    const params = prepareParams.cleanParams(options,['request']);
    return this.http.post(url,params)
  }
}
