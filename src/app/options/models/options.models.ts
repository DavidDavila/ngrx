export interface OptionsModel {
 reUseAuth:boolean;
 eidApi?:string;
 bearerToken?:string;
 rauthorityId?:string | null;
 externalReference?:string | null;
 idType?:number | null;
 allowedIdTypes?: [] | null,
 lang?:string;
 phone?: string | null; 
 process?:string | null;
 show:boolean;
 env: string;
 authorization?: string | null;
 playsinline:boolean;
}
export interface EidEndpointModel {
  name:string;
  path:string;
}
export const ENVS = ['dev','staging', 'sandbox','live', 'custom']
