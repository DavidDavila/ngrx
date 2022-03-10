import { createAction, props } from '@ngrx/store';

export const actionOptionsSet = createAction(
  '[Options] SET',
  props<any>()
);

export const actionOptionsChangeEnv = createAction(
  '[Options] CHANGE ENV',
  props<any>()
);
