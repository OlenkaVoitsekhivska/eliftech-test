import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/appState';
import { shopsSelector } from 'src/app/store/shops/selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public shops$ = this.store
    .select(shopsSelector)
    .pipe(map((shops) => shops.map(({ _id, name }) => ({ _id, name }))));

  constructor(private store: Store<AppState>) {}
}
