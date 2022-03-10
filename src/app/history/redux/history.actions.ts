import { createAction, props } from '@ngrx/store';

export const actionHistoryPush = createAction(
  '[History] PUSH',
  props<any>()
);
