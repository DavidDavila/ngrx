import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState, selectComponent, selectOptions } from '../../app.state';
import { EidComponentModel, EID_COMPONENTS } from '../models/eid-component.models';
import { ProcessesService } from '../processes/processes.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  stateComponent$ = this.store.select(selectComponent);
  stateOptions$ = this.store.select(selectOptions);
  component: EidComponentModel = EID_COMPONENTS['VIDEOID'];

  constructor(private store: Store<AppState>, private processesService: ProcessesService) { 
    this.stateComponent$.subscribe(c =>this.component = c)
  }
  start(){
      switch(this.component.name){
        case EID_COMPONENTS['VIDEOID'].name:
          this.videoId2(this.component);
        break;
        case EID_COMPONENTS['VIDEOID3'].name:
          this.videoId3(this.component);
        break;
        case EID_COMPONENTS['CONFERENCEID'].name:
          this.conferenceId(this.component);
        break;
        case EID_COMPONENTS['SMILEID'].name:
          this.smileId(this.component);
        break;
        case EID_COMPONENTS['VIDEOSCAN'].name:
          this.videoScan(this.component);
        break;
        case EID_COMPONENTS['VIDEOSCAN3'].name:
          this.videoScan3(this.component);
        break;
      }
  
  }
  async smileId(component: EidComponentModel) {
    await this.processesService.getAuth({},component)
    await this.processesService.smileIdStart()
  }


  async videoScan(component: EidComponentModel) {
    await this.processesService.getAuth({},component)
    await this.processesService.videoScanStart()
  }

  async videoId2(component:EidComponentModel){
 
   await this.processesService.getAuth({process:'Unattended'},component)
   await this.processesService.videoId2Start()
  }
  async videoId3(component:EidComponentModel){
    await this.processesService.getAuth({process:'Unattended'},component)
    await this.processesService.videoId3Start()
  }

  async videoScan3(component: EidComponentModel) {
    await this.processesService.getAuth({},component)
    await this.processesService.videoScan3Start()
  }

  async conferenceId(component:EidComponentModel){
    const options = await firstValueFrom(this.stateOptions$);

    await this.processesService.getAuth({process:'Attended',  rauthorityIdId:options.rauthorityId },component)
    await this.processesService.conferenceId()
  }
}


