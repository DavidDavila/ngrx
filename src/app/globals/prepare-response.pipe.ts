import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prepareResponse'
})
export class PrepareResponsePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    try {
      const resp = typeof value === 'object' ? value:JSON.parse(value);
      return this.formatObject(JSON.stringify(resp, undefined, 4))
    } catch (error) {
     return value
    }


  }
  formatObject(value:string){
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
