import { Pipe, PipeTransform } from '@angular/core';
import { EID_COMPONENTS } from '../eid-component/models/eid-component.models';

@Pipe({
  name: 'prepareParams'
})
export class PrepareParamsPipe implements PipeTransform {
  cleanParams(value: any, args: any[]) {
    let resp = { ...value }

    if (args[0] === 'request') {
      delete resp.reUseAuth;
      delete resp.eidApi;
      delete resp.bearerToken;
      delete resp.idType;
      delete resp.allowedIdTypes;
      delete resp.lang;
      delete resp.authorization;
      delete resp.playsinline;

    } else if (args[0] === 'start') {
      switch (args[1]) {
        case EID_COMPONENTS['VIDEOID'].name:
        case EID_COMPONENTS['VIDEOSCAN'].name:
          resp = {
            playsinline: resp.playsinline,
            authorization: resp.authorization,
            idType: resp.idType
          }
          break;
        case EID_COMPONENTS['SMILEID'].name:
          resp = {
            playsinline: resp.playsinline,
            authorization: resp.authorization,
            lang: resp.lang,
          }
          break;
        case EID_COMPONENTS['VIDEOSCAN3'].name:
        case EID_COMPONENTS['VIDEOID3'].name:
          resp = {
            playsinline: resp.playsinline,
            authorization: resp.authorization,
            idType: resp.idType,
            allowedIdTypes: resp.allowedIdTypes
          }
          break;
        case EID_COMPONENTS['CONFERENCEID'].name:
          resp = {
            playsinline: resp.playsinline,
            authorization: resp.authorization,
            idType: resp.idType,
            }
          break;
      }

    } else if (args[0] === 'init') {
      switch (args[1]) {
        case EID_COMPONENTS['VIDEOSCAN3'].name:
        case EID_COMPONENTS['VIDEOSCAN'].name:
        case EID_COMPONENTS['SMILEID'].name:
        case EID_COMPONENTS['VIDEOID'].name:
        case EID_COMPONENTS['CONFERENCEID'].name:
        case EID_COMPONENTS['VIDEOID3'].name:
          resp = {
            eidApi: resp.eidApi,
            lang: resp.lang
          }
          break;

      }

    }
    for (var propName in resp) {
      if (!resp[propName] || resp[propName].length === 0) {
        delete resp[propName];
      }
    }
    delete resp.show;
    delete resp.env;
    delete resp.type;
    return resp
  }
  transform(value: any, ...args: any[]): any {
    const resp = this.cleanParams(value, args);
    try {

      return this.formatObject(JSON.stringify(resp, undefined, 4))
    } catch (error) {
      return value
    }


  }
  formatObject(value: string) {
    value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return value.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: string) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    })

  }

}
