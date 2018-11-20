import {HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store} from '@ngrx/store';

import * as containersRoot from './containers';
import * as servicesRoot from './services';

/**
 * The initial application entry point:
 */
import {AngularMaterialModule} from './angular-material.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppStoreModule} from './app-store.module';
import {ToolbarComponentModule} from './components/toolbar/toolbar-component.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule,
    /**
     * The initial application entry point:
     */
    AngularMaterialModule,
    AppRoutingModule,
    ToolbarComponentModule,
    /**
     * View Containers
     */
    containersRoot.HomeModule,
    containersRoot.PageNotFoundModule,
    containersRoot.SignInModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: servicesRoot.AppConfigService.Initialize,
      deps: [HttpClient, servicesRoot.AppConfigService, Store],
      multi: true,
    },
  ],
})
export class AppModule {
}
