import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AngularMaterialModule} from '../../angular-material.module';
import {AppStoreModule} from '../../app-store.module';
import {SignInComponent} from './sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppStoreModule,
  ]
})
export class SignInModule {
}
