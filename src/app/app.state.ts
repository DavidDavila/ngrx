import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import EidComponentEffects from './eid-component/eid-component.effects';
import { reducer as ComponentReducer, State as ComponentState } from './eid-component/redux/eid-component.reducers';
import VideoEffects from './eid-component/video/video.effects';
import { reducer as HistoryReducer, State as HistoryState } from './history/redux/history.reducers';
import OptionsEffects from './options/options.effects';
import { reducer as OptionsReducer, State as OptionsState } from './options/redux/options.reducers';


export interface AppState {
  history: HistoryState,
  options: OptionsState,
  component: ComponentState
}
export const effects = [
  EidComponentEffects,
  VideoEffects,
  OptionsEffects
]
export const reducers: ActionReducerMap<AppState, any> = {
  history:HistoryReducer,
  options:OptionsReducer,
  component:ComponentReducer
}

export function clearStateMetaReducer<State>(reducer: ActionReducer<State>): ActionReducer<State> {
  return function clearStateFn(state: State | undefined, action: Action) {
    let returnState = state
    return reducer(returnState, action);
  };
}

export const metaReducers: MetaReducer[] = [clearStateMetaReducer];

export const selectHistory = createFeatureSelector<HistoryState>('history');
export const selectOptions = createFeatureSelector<OptionsState>('options');
export const selectComponent = createFeatureSelector<ComponentState>('component');