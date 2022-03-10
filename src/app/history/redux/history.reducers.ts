import { createReducer, on } from '@ngrx/store';
import { HistoryModel } from '../models/history.models';
import { actionHistoryPush } from './history.actions';
export type State = HistoryModel[];

export const initialState: State = [];

export const reducer = createReducer<State>(
  initialState,
  on(actionHistoryPush, (state: State, payload:HistoryModel) => {
    return [ 
      payload,
      ...state     
    ];
  })
)