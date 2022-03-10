import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  @ViewChild('textAreaComponent') textAreaComponent: ElementRef | undefined;
  customCss:string = '';

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('custom-css',  async (element:any) =>{
      const rightSide = document.querySelector('.right-side')
      !rightSide?.classList.contains('show') && rightSide?.classList.add('show');
      (document.querySelectorAll('div[role="tab"]')[2] as any).click();
     this.customCss += `.${element.detail.split(' ').join('.')} {

} 
`;
    console.log(this.customCss)
    }, false);
  }
  save(){
    const styleTag = document.querySelector('#custom-style');
    styleTag?.parentNode?.removeChild(styleTag);
    document.head.insertAdjacentHTML("beforeend", `<style id="custom-style">${this.customCss}</style>`);

  }
  export(){
    const  blob = new Blob([this.customCss], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "eid-custom-style.css");
  }

}
