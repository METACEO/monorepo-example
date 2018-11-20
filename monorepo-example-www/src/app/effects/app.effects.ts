import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {AppActionTypes} from '../actions/app.actions';
import {UserService} from "../services/user.service";

@Injectable()
export class AppEffects {

  @Effect({dispatch: false})
  userClickedToolbarDoHome$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.UserClickedToolbarToHome),
    tap(() => this.router.navigate(['/'])),
  );

  @Effect({dispatch: false})
  userClickedToolbarDoSignin$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.UserClickedToolbarToSignin),
    tap(() => this.router.navigate(['/sign-in'])),
  );

  @Effect({dispatch: false})
  userClickedToolbarDoSignout$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.UserClickedToolbarToSignout),
    tap(() => this.userService.signOut()),
  );

  constructor(private readonly actions$: Actions,
              private readonly router: Router,
              private readonly userService: UserService) {
  }

}
