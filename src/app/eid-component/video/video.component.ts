import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { AppState, selectComponent } from '../../app.state';
import { EidComponentModel } from '../models/eid-component.models';
import { actionEidComponentInit } from '../redux/eid-component.actions';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public width:number =500;
  public height:number =300;
  public disabled:boolean = false;
  public showButton:boolean = true;
 
  stateComponent$ = this.store.select(selectComponent);
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger | undefined;
  
  component: EidComponentModel | undefined;
  contextMenuPosition = { x: '0px', y: '0px' };
  currentElement:any
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  
    this.stateComponent$.subscribe((component:EidComponentModel)=>{
      this.component = component;
      this.showButton = !component.init;
    })
  }
  start(){
    this.store.dispatch(actionEidComponentInit({...this.component,init:true}))
  }
  destroy(): void {
   window.location.reload()
  }
  
  onContextMenu(event: MouseEvent, item: any) {
    this.currentElement = event.target;
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu!.menuData = { 'item': item };
    this.contextMenu!.menu.focusFirstItem('mouse');
    this.contextMenu!.openMenu();
  }

  onContextMenuAction1(event: any, item:any) {
    const customE =  new CustomEvent('custom-css', { detail:this.currentElement.className});
    document.dispatchEvent(customE);
  }
  

}
