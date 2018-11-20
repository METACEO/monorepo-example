import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SessionModel} from '@monorepo-example/shared';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import * as fromStore from '../../reducers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  appError$: Observable<string>;
  appInstantiated$: Observable<boolean>;
  appFeatures$: Observable<string[]>;
  appSession$: Observable<SessionModel>;
  urlSigninGithub = environment.url.signinGithub;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private readonly store: Store<fromStore.State>) {
    this.appError$ = this.store.select(fromStore.selectAppError);
    this.appFeatures$ = this.store.select(fromStore.selectAppFeatures);
    this.appInstantiated$ = this.store.select(fromStore.selectAppInstantiated);
    this.appSession$ = this.store.select(fromStore.selectAppSession);
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value'
      : this.email.hasError('email') ? 'Not a valid email'
        : '';
  }

  getPasswordErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value'
      : this.email.hasError('email') ? 'Not a valid email'
        : '';
  }

}
