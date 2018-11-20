import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SessionModel} from '@monorepo-example/shared';
import {Store} from '@ngrx/store';

import {environment} from '../../environments/environment';
import * as reducersRoot from '../reducers';
import {LocationService} from './location.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  session: SessionModel = null;

  constructor(private readonly httpClient: HttpClient,
              private readonly locationService: LocationService,
              private readonly store: Store<reducersRoot.State>) {
    this.store.select(reducersRoot.selectAppSession).subscribe(session => this.session = session);
  }

  public signOut(): void {
    this.httpClient.post(environment.url.signout, {id: this.session.id}, {withCredentials: true})
      .subscribe(() => this.locationService.goHome())
  }

}
