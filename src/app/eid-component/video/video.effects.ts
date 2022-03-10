import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { actionEidComponentInit } from '../redux/eid-component.actions';
import { VideoService } from './video.service';

@Injectable()
export default class VideoEffects {
  constructor(
    private actions$: Actions,
    private videoService: VideoService
  ) {}

  videoInit$ = createEffect(() => this.actions$.pipe(
    ofType(actionEidComponentInit),
    tap((component) =>{
      
       component.init && this.videoService.start()
    }
    ),
  ), { dispatch: false });
}
