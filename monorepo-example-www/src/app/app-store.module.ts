import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import * as effectsRoot from './effects';
import {metaReducers, reducers} from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      effectsRoot.AppEffects,
    ]),
  ],
})
export class AppStoreModule {
}
