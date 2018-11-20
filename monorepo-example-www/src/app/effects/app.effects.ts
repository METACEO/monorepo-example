import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {AppActionTypes} from '../actions/app.actions';
import {UserService} from "../services/user.service";

@Injectable()
export class AppEffects {

  @Effect({dispatch: false})
  userClickedToolbarDoSignout$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.UserClickedToolbarToSignout),
    tap(() => this.userService.signOut()),
  );

  constructor(private readonly actions$: Actions,
              private readonly userService: UserService) {
  }

}
