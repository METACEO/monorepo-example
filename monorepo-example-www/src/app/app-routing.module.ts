import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as containersRoot from './containers';
import {RouteGuardService} from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: containersRoot.HomeComponent,
  },
  {
    path: 'sign-in',
    component: containersRoot.SignInComponent,
    canActivate: [RouteGuardService],
    data: {
      allow: RouteGuardService.GUEST,
      redirect: ['/'],
    },
  },
  {
    path: 'settings',
    component: containersRoot.PageNotFoundComponent,
    canActivate: [RouteGuardService],
    data: {
      allow: RouteGuardService.USER,
      redirect: ['/sign-in'],
    },
  },
  {
    path: '**',
    component: containersRoot.PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
