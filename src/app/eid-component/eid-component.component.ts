import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectComponent } from '../app.state';
import { HistoryModel } from '../history/models/history.models';
import { actionHistoryPush } from '../history/redux/history.actions';
import { EidComponentModel, EID_COMPONENTS } from './models/eid-component.models';
import { actionEidComponentSet } from './redux/eid-component.actions';
import { initialState } from './redux/eid-component.reducers';
declare const EID: any;

@Component({
  selector: 'app-eid-component',
  templateUrl: './eid-component.component.html',
  styleUrls: ['./eid-component.component.scss']
})
export class EidComponent {
  public videoid3 = EID_COMPONENTS['VIDEOID3'].name
  msgCheck = 'Check Requirements';
  public components = EID_COMPONENTS;
  public selectedComponent = EID_COMPONENTS['VIDEOID3']
  state$ = this.store.select(selectComponent);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(actionEidComponentSet(initialState));
  }

  selectComponent(component: EidComponentModel) {
    this.store.dispatch(actionEidComponentSet(component));

  }
  async checkRequirements() {

    try {
      this.msgCheck = 'Checking ... please wait'
      const resp = await EID.videoId.checkRequirements();
      this.msgCheck = 'Check Requirements'
            const history:HistoryModel = {
            params:undefined,
            status:200,
            response:resp,
            url:'Check Requirements'
          }
          this.store.dispatch(actionHistoryPush(history))


      const rightSide = document.querySelector('.right-side')
      !rightSide?.classList.contains('show') && rightSide?.classList.add('show');
      (document.querySelectorAll('div[role="tab"]')[1] as any).click();

      (document.querySelectorAll('.mat-expansion-panel-header')[0] as any).click()
   

    } catch (error) {
      console.log(error)

    }
  }
}
