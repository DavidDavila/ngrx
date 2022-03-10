import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { EidComponentService } from './eid-component.service';
import { actionEidComponentSet } from './redux/eid-component.actions';

@Injectable()
export default class EidComponentEffects {
  constructor(
    private actions$: Actions,
    private eidComponentService: EidComponentService
  ) {}

  EidComponentSet$ = createEffect(() => this.actions$.pipe(
    ofType(actionEidComponentSet),
    tap((component) =>this.eidComponentService.loadScript()
    ),
  ), { dispatch: false });
}
