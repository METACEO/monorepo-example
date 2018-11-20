import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppStoreModule} from '../../app-store.module';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppStoreModule,
  ],
})
export class HomeModule {
}
