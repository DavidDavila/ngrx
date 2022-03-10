import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState, selectOptions } from './app.state';
import { actionEidComponentUpdate } from './eid-component/redux/eid-component.actions';
import { actionOptionsSet } from './options/redux/options.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sdk-tester';
  show = true
  state$ = this.store.select(selectOptions);
  constructor(private store: Store<AppState>,private http:HttpClient) {
    document.addEventListener('result',  async (e:any) =>{
      
      const options = await firstValueFrom(this.state$);
      try {
        await firstValueFrom(this.http.get(options.eidApi + e.detail));
        (document.querySelectorAll('div[role="tab"]')[1] as any).click();
        (document.querySelectorAll('.mat-expansion-panel-header')[0] as any).click()
        this.store.dispatch(actionEidComponentUpdate({instance:null,init:false}));
      } catch (error) {
        
      }
   
    
    }, false);
   this.state$.subscribe(options=>{
      this.show = options.show;
    })    
  }

  changeOptions(event:any){
    this.store.dispatch(actionOptionsSet(event));
  }
}
