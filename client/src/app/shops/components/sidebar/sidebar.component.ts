import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/shops/reducers';
import { Store } from '@ngrx/store';
import { shopsSelector } from 'src/app/store/shops/selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // @Input() places: Restaurant[] = [];

  shops$ = this.store
    .select(shopsSelector)
    .pipe(map((shops) => shops.map(({ _id, name }) => ({ _id, name }))));

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    console.log('sidebar here');
  }
}
