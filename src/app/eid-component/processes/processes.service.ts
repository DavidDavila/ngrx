import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AppState, selectComponent, selectOptions } from '../../app.state';
import { PrepareParamsPipe } from '../../globals/prepare-params.pipe';
import { actionOptionsSet } from '../../options/redux/options.actions';
import { ApiCallsService } from '../api-calls.service';
import { EidComponentModel, EID_COMPONENTS } from '../models/eid-component.models';
import { actionEidComponentUpdate } from '../redux/eid-component.actions';
declare const EID: any;

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {
  stateOptions$ = this.store.select(selectOptions);
  stateComponent$ = this.store.select(selectComponent);
  prepareParams = new PrepareParamsPipe()
  constructor(private store: Store<AppState>, private apiCallsService: ApiCallsService, ) {
   
  }

  getAuth(params: any, component: EidComponentModel) {
    return new Promise<void>(async (resolve, reject) => {
      const options = await firstValueFrom(this.stateOptions$);
      options.phone && (params.phone = options.phone)
      let resp;
      if (!options.reUseAuth || !options.authorization) {
        try {    
          resp = await firstValueFrom(await this.apiCallsService.getAuthorization(options.eidApi+component.requestPath)) as { id: string, authorization: string }
          this.store.dispatch(actionOptionsSet({authorization: resp.authorization }));
        } catch (error) {
          this.store.dispatch(actionEidComponentUpdate({ ...component, init: false }));
        }
      }
      resolve()
    })
  }
  async videoScanStart() {
    const options = await firstValueFrom(this.stateOptions$);
    const videoScan = EID.videoScan('#video',this.prepareParams.cleanParams(options,['init', EID_COMPONENTS['VIDEOSCAN'].name]));
    videoScan.turnOn();
    videoScan.start(
      this.prepareParams.cleanParams(options,['start', EID_COMPONENTS['VIDEOSCAN'].name])
    );
    this.store.dispatch(actionEidComponentUpdate({instance: videoScan}));
    videoScan.on("completed",
      function (result: any) {
        const event =  new CustomEvent('result', { detail: '/videoscan/'+result.id });
        document.dispatchEvent(event);
        videoScan.destroy && videoScan.destroy();
        videoScan.turnOff();
      });
    videoScan.on("Failed",
      function (error: any) {
        alert("VideoScan Failed");
      });

  }
  async smileIdStart() {
    const options = await firstValueFrom(this.stateOptions$);
    var smileId = EID.smileId('#video',this.prepareParams.cleanParams(options,['init', EID_COMPONENTS['SMILEID'].name]));
    smileId.turnOn();

    smileId.start(
      this.prepareParams.cleanParams(options,['start', EID_COMPONENTS['SMILEID'].name])
    );
    this.store.dispatch(actionEidComponentUpdate({ instance: smileId }));

    smileId.on("completed",
      (result: any) => {
        const event =  new CustomEvent('result', { detail: '/smileid/'+result.id });
        document.dispatchEvent(event);
        smileId.turnOff();
      });
    smileId.on("failed",
      (error: any) => {
        smileId.turnOff();
        smileId.destroy && smileId.destroy();

        alert(" smileID Failed");
      });
  }
  async videoId2Start() {
    const options = await firstValueFrom(this.stateOptions$);
    const videoId = EID.videoId('#video',
      this.prepareParams.cleanParams(options,['init', EID_COMPONENTS['VIDEOID'].name])
    );
    videoId.turnOn();
    videoId.start(
      this.prepareParams.cleanParams(options,['start', EID_COMPONENTS['VIDEOID'].name])
    );
    this.store.dispatch(actionEidComponentUpdate({instance: videoId }));
    videoId.on("completed",
    ( (result: any) => {
      videoId.turnOff();
      videoId.destroy && videoId.destroy();
      const event =  new CustomEvent('result', { detail: '/videoid/'+result.id });
      document.dispatchEvent(event);
    }).bind(this));
  videoId.on("failed",
    (error: any) => {
      alert(" videoId Failed");
    });
  }

  async videoId3Start() {
    const component = await firstValueFrom(this.stateComponent$);
    const options = await firstValueFrom(this.stateOptions$);
    const videoId = EID.videoId('#video',  this.prepareParams.cleanParams(options,['init', EID_COMPONENTS['VIDEOID3'].name]));

    this.store.dispatch(actionEidComponentUpdate({ ...component, instance: videoId }));
    videoId.start(
      this.prepareParams.cleanParams(options,['start', EID_COMPONENTS['VIDEOID3'].name])
    );
    videoId.on("completed",
    (result: any) => {
      videoId.turnOff();
      const event =  new CustomEvent('result', { detail: '/videoid/'+result.id });
      document.dispatchEvent(event);
      videoId.destroy && videoId.destroy();

    });
  videoId.on("failed",
    (error: any) => {
      alert(" videoId Failed");
    });
  }

  async videoScan3Start() {
    const options = await firstValueFrom(this.stateOptions$);
    const videoScan = EID.videoScan('#video',  this.prepareParams.cleanParams(options,['init', EID_COMPONENTS['VIDEOSCAN3'].name]));
    videoScan.start(
      this.prepareParams.cleanParams(options,['start', EID_COMPONENTS['VIDEOSCAN3'].name])
    );
    this.store.dispatch(actionEidComponentUpdate({instance: videoScan}));
    videoScan.on("completed",
      function (result: any) {
        const event =  new CustomEvent('result', { detail: '/videoscan/'+result.id });
        document.dispatchEvent(event);
        videoScan.destroy && videoScan.destroy();
        videoScan.turnOff();
      });
    videoScan.on("Failed",
      function (error: any) {
        alert("VideoScan Failed");
      });
  }

  async conferenceId() {
    const component = await firstValueFrom(this.stateComponent$);
    const options = await firstValueFrom(this.stateOptions$);
    const videoId = EID.videoIDAttended('#video',  this.prepareParams.cleanParams(options,['init', EID_COMPONENTS['CONFERENCEID'].name]));


    videoId.turnOn();
    videoId.start( this.prepareParams.cleanParams(options,['start', EID_COMPONENTS['CONFERENCEID'].name]));

    this.store.dispatch(actionEidComponentUpdate({ ...component, instance: videoId }));
    videoId.on("completed",
    (result: any) => {
      videoId.turnOff();
      const event =  new CustomEvent('result', { detail: '/videoid/'+result.id });
      document.dispatchEvent(event);
      videoId.destroy && videoId.destroy();
    });
  videoId.on("failed",
    (error: any) => {
      alert(" videoId Failed");
    });
  }
}
