import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-json2html',
  templateUrl: './json2html.component.html',
  styleUrls: ['./json2html.component.scss']
})
export class Json2htmlComponent implements OnInit {
  @Input() objectToFormat:any;
  constructor() { }

  ngOnInit(): void {
  }

}
