import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppStoreModule} from '../../app-store.module';
import {PageNotFoundComponent} from './page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    AppStoreModule,
  ],
})
export class PageNotFoundModule {
}
