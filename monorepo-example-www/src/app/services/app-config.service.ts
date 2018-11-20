import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConfigModel} from '@monorepo-example/shared';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import * as appActions from '../actions/app.actions';
import * as reducersRoot from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private readonly store: Store<reducersRoot.State>) {
  }

  public static Initialize(httpClient: HttpClient, appConfigService: AppConfigService): () => Promise<void> {
    return () => new Promise<void>(resolve => {
      httpClient.get<AppConfigModel>(environment.url.appConfig, {withCredentials: true})
        .pipe(
          catchError(err => {
            console.error({err});
            return of(null);
          })
        )
        .subscribe(appConfig => {
          appConfigService.load(appConfig);
          resolve();
        });
    });
  }

  public load(appConfig: AppConfigModel): void {
    this.store.dispatch(new appActions.LoadInitialAppConfig(appConfig));
  }

}
