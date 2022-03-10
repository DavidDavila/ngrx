import { createReducer, on } from '@ngrx/store';
import { EidComponentModel, EID_COMPONENTS } from '../models/eid-component.models';
import { actionEidComponentInit, actionEidComponentSet, actionEidComponentUpdate } from './eid-component.actions';
export type State = EidComponentModel;

export const initialState: State = EID_COMPONENTS['VIDEOID3'];

export const reducer = createReducer<State>(
  initialState,
  on(actionEidComponentSet, (state: State, payload:EidComponentModel) => {
    return payload;
  }),
  on(actionEidComponentInit, (state: State, payload:EidComponentModel) => {
    return payload;
  }),
  on(actionEidComponentUpdate, (state: State, payload:EidComponentModel) => {
    return {...state,...payload};
  }),
  
)