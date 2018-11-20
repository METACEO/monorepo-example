import {AppConfigModel} from '@monorepo-example/shared';
import {Action} from '@ngrx/store';

export enum AppActionTypes {
  LoadInitialAppConfig = '[App] Load Initial App Config',
  UserClickedToolbarToHome = '[App] User Clicked Toolbar To Home',
  UserClickedToolbarToSignin = '[App] User Clicked Toolbar To Signin',
  UserClickedToolbarToSignout = '[App] User Clicked Toolbar To Signout',
}

export class LoadInitialAppConfig implements Action {
  readonly type = AppActionTypes.LoadInitialAppConfig;

  constructor(public readonly payload: AppConfigModel) {
  }
}

export class UserClickedToolbarToHome implements Action {
  readonly type = AppActionTypes.UserClickedToolbarToHome;
}

export class UserClickedToolbarToSignin implements Action {
  readonly type = AppActionTypes.UserClickedToolbarToSignin;
}

export class UserClickedToolbarToSignout implements Action {
  readonly type = AppActionTypes.UserClickedToolbarToSignout;
}

export type AppActions =
  | LoadInitialAppConfig
  | UserClickedToolbarToHome
  | UserClickedToolbarToSignin
  | UserClickedToolbarToSignout;
