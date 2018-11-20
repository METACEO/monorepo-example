import {UserAdapter, UserModel} from '@monorepo-example/shared';
import {Injectable} from '@nestjs/common';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as uuid from 'uuid/v4';

import {BaseStorageService} from '../storage';

@Injectable()
export class UserService {

    constructor(private readonly baseStorageService: BaseStorageService) {
    }

    public createUser(user: any = {}): Observable<UserModel> {
        return this.baseStorageService.createUser(UserAdapter.adapt({
            id: uuid(),
            ...user,
        }));
    }

    public getUserById(id: string): Observable<UserModel> {
        return this.baseStorageService.getUser(id);
    }

    public getUserByGithubId(githubId: string, createIfNotExists?: boolean): Observable<UserModel> {
        return this.baseStorageService.getUserByGithubId(githubId)
            .pipe(
                switchMap((user: UserModel) => {
                   if (user) {
                       return of(user);
                   }
                   return this.createUser({
                       auth: {
                           oauth: {
                               github: {
                                   id: githubId,
                               },
                           },
                       },
                   });
                }),
            );
    }

    public updateUser(user: UserModel, updates: UserModel): Observable<UserModel> {
        return of(user);
    }
}
