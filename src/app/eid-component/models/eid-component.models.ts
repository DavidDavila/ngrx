type EidComponentModelKey = {
  [key: string]: EidComponentModel
}
export type EidComponentModel =  {
  name:string,
  file:string[],
  init:boolean,
  authorization?:string,
  instance?:any,
  path:string,
  requestPath:string,
}
export const EID_COMPONENTS:EidComponentModelKey ={
  VIDEOID:{    
    name:'VideoId v2',
    file:['https://etrust-dev.electronicid.eu/v2/js/videoid.js'],
    init:false,
    requestPath:'/videoid.request',
    path:'https://etrust-dev.electronicid.eu/v2'
  },
  VIDEOID3:{
    name:'VideoId v3',
    file:['https://etrust-dev.electronicid.eu/js/videoid-3.x/videoid.js'],
    init:false,
    requestPath:'/videoid.request',
    path:'https://etrust-dev.electronicid.eu/v2'
  },
  VIDEOSCAN3:{
    name:'VideoScan v3',
    file:['https://etrust-dev.electronicid.eu/js/videoid-3.x/videoscan.js'],
    init:false,
    requestPath:'/videoscan.request',
    path:'https://etrust-dev.electronicid.eu/v2'
  },
  SMILEID:{    
    name:'SmileId',
    file:['https://etrust-dev.electronicid.eu/v2/js/smileid.js'],
    init:false,
    requestPath:'/smileid.request',
    path:'https://etrust-dev.electronicid.eu/v2'
  },
  VIDEOSCAN:{    
    name:'VideoScan',
    file:['https://etrust-dev.electronicid.eu/v2/js/videoscan.js'],
    init:false,
    requestPath:'/videoscan.request',
    path:'https://etrust-dev.electronicid.eu/v2'
  },
  CONFERENCEID:{    
    name:'ConferenceId',
    file:['https://etrust-dev.electronicid.eu/v2/js/videoidattended.js'],
    init:false,
    requestPath:'/videoid.request',
    path:'https://etrust-dev.electronicid.eu/v2'
  }
}