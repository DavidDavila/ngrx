import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState, selectComponent, selectOptions } from '../app.state';
import { EidComponentModel, EID_COMPONENTS } from '../eid-component/models/eid-component.models';
import { ENVS } from './models/options.models';
import { actionOptionsChangeEnv, actionOptionsSet } from './redux/options.actions';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  public selectEidApi: string = ENVS[0];
  public envs = ENVS;
  public component: EidComponentModel = EID_COMPONENTS['VIDEOID3'];
  
  stateOptions$ = this.store.select(selectOptions);
  stateComponent$ = this.store.select(selectComponent);
  constructor(private store: Store<AppState>) {
    this.stateComponent$.subscribe(c =>{ 
      this.component = c;
      if(this.component.name != c.name){
        this.selectEnv()
      }
     
    })
  }
  
  changeOptions(event: any) {
    this.store.dispatch(actionOptionsSet(event));
  }
  stringToArray(s: string) {
    let arr: number[];
    
      arr = s.split(/ |,/g).filter(s=>s).map((doc) => Number(doc.trim())).filter(s=>s)
      
    this.store.dispatch(actionOptionsSet({ allowedIdTypes: arr }));
   
  }
  async selectEnv() {
   
    if(this.selectEidApi == 'custom'){
      this.store.dispatch(actionOptionsSet({ eidApi: ''}));
    }else{
      this.store.dispatch(actionOptionsChangeEnv({ env: this.selectEidApi}));
      const options = await firstValueFrom(this.stateOptions$);
      const envs = ENVS.join('|');
      const eidApi = this.component.path?.replace(new RegExp(envs,'g'),options.env)
   
      this.store.dispatch(actionOptionsSet({ eidApi }));
    }
   
  }
}
