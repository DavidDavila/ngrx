import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectHistory } from '../app.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  panelOpenState = false;
  state$ = this.store.select(selectHistory);

  constructor(private store: Store<AppState>) {  }

  ngOnInit(): void {
  }

}
