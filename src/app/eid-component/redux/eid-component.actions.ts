import { createAction, props } from '@ngrx/store';

export const actionEidComponentSet = createAction(
  '[Eid Component] SET COMPONENT',
  props<any>()
);
export const actionEidComponentInit = createAction(
  '[Eid Component] INIT COMPONENT',
  props<any>()
);

export const actionEidComponentUpdate = createAction(
  '[Eid Component] UPDATE COMPONENT',
  props<any>()
);
