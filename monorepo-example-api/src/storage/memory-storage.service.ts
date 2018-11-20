import {UserModel} from '@monorepo-example/shared';
import {Injectable} from '@nestjs/common';
import {Observable, of} from 'rxjs';

import {BaseStorageService} from './storage.module';

@Injectable()
export class MemoryStorageService implements BaseStorageService {

    private users: UserModel[] = [];

    public createUser(user: UserModel): Observable<UserModel> {
        this.users.push(user);
        return of(user);
    }

    public getUser(id: string): Observable<UserModel> {
        for (const user of this.users) {
            if (user.id === id) {
                return of(user);
            }
        }
        return of(null);
    }

    public getUserByGithubId(githubId: string): Observable<UserModel> {
        for (const user of this.users) {
            if (!user.auth) {
                continue;
            }
            if (!user.auth.oauth) {
                continue;
            }
            if (!user.auth.oauth.github) {
                continue;
            }
            if (user.auth.oauth.github.id === githubId) {
                return of(user);
            }
        }
        return of(null);
    }

}
