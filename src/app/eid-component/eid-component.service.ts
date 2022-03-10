import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState, selectComponent, selectOptions } from '../app.state';
import { ENVS, OptionsModel } from '../options/models/options.models';
import { actionOptionsSet } from '../options/redux/options.actions';
import { EidComponentModel, EID_COMPONENTS } from './models/eid-component.models';
declare let EID: any;
@Injectable({
  providedIn: 'root'
})
export class EidComponentService {
  stateOptions$ = this.store.select(selectOptions);
  stateComponent$ = this.store.select(selectComponent);

  constructor(private store: Store<AppState>) { }
  setEnvPath(path:string,options: OptionsModel) {
    const envs = ENVS.join('|');
    return path.replace(new RegExp(envs,'g'),options.env)
  }
  async loadScript(){
    const options = await firstValueFrom(this.stateOptions$);
    const component = await firstValueFrom(this.stateComponent$);
    this.deleteIncompatibilities(component)
    this.setProcessAuth(component, options)
    component.file.forEach(file=>{
      const node = document.createElement('script');
      node.className = 'dynamic-loaded';
      node.src = (this.setEnvPath(file, options)); 
      console.log(node.src)
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
    })

    return true
  }
  setProcessAuth(component: EidComponentModel, options: OptionsModel) {
    switch(component.name){
      case EID_COMPONENTS['VIDEOID'].name:
      case EID_COMPONENTS['VIDEOID3'].name:
       this.store.dispatch(actionOptionsSet({process:'Unattended'}))
      break;
      case EID_COMPONENTS['CONFERENCEID'].name:
        this.store.dispatch(actionOptionsSet({process:'Attended'}))

      break;
      default:
        this.store.dispatch(actionOptionsSet({process:null}))

      break;
    }
  }
  deleteIncompatibilities(component:EidComponentModel){
    try {
      if(EID){
        EID = null
      }
    } catch (error) {
      
    }
    const script = Array.from(document.querySelectorAll(`script.dynamic-loaded`));
    script.forEach((s=>s.parentNode?.removeChild(s)))
  }
}
