import { createReducer, on } from '@ngrx/store';
import { EID_COMPONENTS } from '../../eid-component/models/eid-component.models';
import { OptionsModel } from '../models/options.models';
import { actionOptionsChangeEnv, actionOptionsSet } from './options.actions';
export type State = OptionsModel;
const getLS = (env:string,param:string)=>{
  const ls = localStorage.getItem('sdkTester')? JSON.parse(localStorage['sdkTester']) : {}
  if(!ls || !(ls[env]))return false;
  return ls[env][param];
}
export const initialState_Options: State = {
  playsinline:getLS('dev','playsinline') || false,
reUseAuth:getLS('dev','reUseAuth') || false,
  eidApi:EID_COMPONENTS['VIDEOID'].path,
bearerToken:getLS('dev','bearerToken') || null,
rauthorityId:getLS('dev','rauthorityId') || null,
idType:getLS('dev','idType') || null,
externalReference:getLS('dev','externalReference') || null,
allowedIdTypes:getLS('dev','allowedIdTypes') ||  [],
lang:getLS('dev','lang') || 'en',
phone:getLS('dev','phone') ||  null,
  show:true,
  env:'dev',
process:getLS('dev','process') || 'Unattended'
 }

export const reducer = createReducer<State>(
  initialState_Options,
  on(actionOptionsSet, (state: State, payload:{ [key: string]: string}) => {
    return {...state,...payload}
  }),
  on(actionOptionsChangeEnv, (state: State, payload:{ [key: string]: string}) => {
    return {...state,...payload}
  })
)