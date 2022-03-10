import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { firstValueFrom, tap } from 'rxjs';
import { AppState, selectOptions } from '../app.state';
import { EidComponentService } from '../eid-component/eid-component.service';
import { actionOptionsChangeEnv, actionOptionsSet } from './redux/options.actions';

@Injectable()
export default class OptionsEffects {
  constructor(
    private eidComponentService: EidComponentService,
    private actions$: Actions,private store: Store<AppState>
  ) {}


  OptionsChangeEnv$ = createEffect(() => this.actions$.pipe(
    ofType(actionOptionsChangeEnv), 
    tap((component) =>{
      this.eidComponentService.loadScript();
      
      if(localStorage['sdkTester'] && JSON.parse(localStorage['sdkTester'])[component.env]){
        this.store.dispatch(actionOptionsSet(JSON.parse(localStorage['sdkTester'])[component.env]))
      }else{
        this.store.dispatch(actionOptionsSet({
          reUseAuth:false,           
          bearerToken:null,
          externalReference:null,
          rauthorityId:null,
          idType:null,
          allowedIdTypes: [],
          lang:'en',
          phone: null,
            show:true,
          process:'Unattended'
        }))

      
      }
    })

  ), { dispatch: false });
  actionOptionsSet$ = createEffect(() => this.actions$.pipe(
    ofType(actionOptionsSet), 
    tap(async () =>{
      const stateOptions$ = this.store.select(selectOptions);
      const options = await firstValueFrom(stateOptions$);

      let data = localStorage['sdkTester']? JSON.parse(localStorage['sdkTester'])  : {}
      if(options.env){
        data[options.env] = options;
        localStorage['sdkTester'] = JSON.stringify(data);
      }
    })

  ), { dispatch: false });
}
