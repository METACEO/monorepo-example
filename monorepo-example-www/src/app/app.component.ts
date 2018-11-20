import {Component} from '@angular/core';
import {SessionModel} from '@monorepo-example/shared';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as appActions from './actions/app.actions';
import * as fromStore from './reducers';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appError$: Observable<string>;
  appInstantiated$: Observable<boolean>;
  appFeatures$: Observable<string[]>;
  appSession$: Observable<SessionModel>;

  constructor(private readonly store: Store<fromStore.State>) {
    this.appError$ = this.store.select(fromStore.selectAppError);
    this.appFeatures$ = this.store.select(fromStore.selectAppFeatures);
    this.appInstantiated$ = this.store.select(fromStore.selectAppInstantiated);
    this.appSession$ = this.store.select(fromStore.selectAppSession);
  }

  public doHome(): void {
    this.store.dispatch(new appActions.UserClickedToolbarToHome());
  }

  public doSignin(): void {
    this.store.dispatch(new appActions.UserClickedToolbarToSignin());
  }

  public doSignout(): void {
    this.store.dispatch(new appActions.UserClickedToolbarToSignout());
  }

}
