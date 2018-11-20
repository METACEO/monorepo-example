import {AppConfigModel} from '@monorepo-example/shared';
import {Action} from '@ngrx/store';

export enum AppActionTypes {
  LoadInitialAppConfig = '[App] Load Initial App Config',
  UserClickedToolbarToSignout = '[App] User Clicked Toolbar To Signout',
}

export class LoadInitialAppConfig implements Action {
  readonly type = AppActionTypes.LoadInitialAppConfig;

  constructor(public readonly payload: AppConfigModel) {
  }
}

export class UserClickedToolbarToSignout implements Action {
  readonly type = AppActionTypes.UserClickedToolbarToSignout;
}

export type AppActions =
  | LoadInitialAppConfig
  | UserClickedToolbarToSignout;
